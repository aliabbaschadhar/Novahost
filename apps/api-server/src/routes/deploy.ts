import { prisma } from "@repo/prismadb/client";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import * as k8s from "@kubernetes/client-node";


const deployRouter = Router();
const kc = new k8s.KubeConfig();
kc.loadFromDefault()
// Disable SSL verification for DigitalOcean clusters
// Set NODE_TLS_REJECT_UNAUTHORIZED=0 in your environment to disable SSL verification globally
// Example: export NODE_TLS_REJECT_UNAUTHORIZED=0 // For now only.
const k8sApi = kc.makeApiClient(k8s.CoreV1Api)
const kafkaBrokerUrl = process.env.KAFKA_BROKER_URL;
const kafkaPassword = process.env.KAFKA_SASL_PASSWORD;

deployRouter.post("/", async (req, res) => {
  try {
    const { projectId } = req.body

    const project = await prisma.project.findUnique({
      where: {
        id: projectId
      }
    })

    if (!project) {
      return res.status(StatusCodes.NOT_FOUND).json(
        {
          msg: "Project does not exists!"
        }
      )
    }

    let deployment;
    try {
      deployment = await prisma.deployment.create({
        data: {
          project: { connect: { id: projectId } },
          status: "QUEUED"
        }
      });
    } catch (error) {
      console.error("Error creating a deployment: ", error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Failed to create deployment"
      })
    }

    const podName = `build-server-img-${deployment.id}`;
    const podManifest: k8s.V1Pod = {
      metadata: { name: podName },
      spec: {
        containers: [
          {
            name: 'build-server',
            image: "aliabbaschadhar003/novahost-build-server:latest",
            env: [
              { name: "GIT_REPOSITORY_URL", value: project.gitURL },
              { name: "PROJECT_ID", value: String(projectId) },
              { name: "DEPLOYMENT_ID", value: String(deployment.id) },
              { name: "S3_ACCESS_KEY_ID", value: process.env.S3_ACCESS_KEY_ID },
              { name: "S3_SECRET_ACCESS_KEY", value: process.env.S3_SECRET_ACCESS_KEY },
              { name: "S3_ENDPOINT", value: process.env.S3_ENDPOINT },
              { name: "BUCKET", value: process.env.BUCKET },
              { name: "KAFKA_BROKER_URL", value: kafkaBrokerUrl },
              { name: "KAFKA_SASL_PASSWORD", value: kafkaPassword }
            ]
          }
        ],
        restartPolicy: "Never"
      }
    }

    console.log("Creating pod...")
    await k8sApi.createNamespacedPod({
      namespace: "novahost",
      body: podManifest
    })

    console.log('Pod created successfully...')

    res.json({
      status: "QUEUED",
      data: {
        deploymentId: deployment.id,
        subDomain: project.subDomain
      }
    })

    // Poll the pod status to check whether it is completed or not?
    let completed = false;
    let attempts = 0;
    const maxAttempts = 120;

    while (!completed && attempts < maxAttempts) {
      try {
        const podResponse = await k8sApi.readNamespacedPod({
          name: podName,
          namespace: "novahost"
        })

        const phase = podResponse.status?.phase;
        const containerStatuses = podResponse.status?.containerStatuses

        console.log(`Pod ${podName} status: ${phase}`)

        const buildContainer = containerStatuses?.find(c => c.name === "build-server")
        const isTerminated = buildContainer?.state?.terminated

        if (phase === "Succeeded" || phase === "Failed" || isTerminated) {
          completed = true;

          const exitCode = isTerminated?.exitCode
          const reason = isTerminated?.reason || phase

          console.log(`Pod ${podName} completed - Phase: ${phase}, Exit code: ${exitCode}, Reason: ${reason}`)

          // Delete the pod
          try {
            await k8sApi.deleteNamespacedPod({
              name: podName,
              namespace: "novahost"
            })

            console.log(`Pod ${podName} deleted successfully`)
          } catch (error) {
            console.error("Error deleting the pod:", error)
          }
        } else {
          await new Promise(r => setTimeout(r, 5000)) // Check every five second
        }
      } catch (error) {
        console.error("Error checking pod status:", error)
        await new Promise(r => setTimeout(r, 5000))
      }
      attempts++
    }

    if (!completed) {
      console.log(`Pod ${podName} did not complete within timeout, attempting cleanup!`)
      try {
        await k8sApi.deleteNamespacedPod({
          name: podName,
          namespace: 'novahost'
        })
      } catch (error) {
        console.error(`Error cleaning up pod: ${error}`)
      }
    }
  } catch (error) {
    console.error("Error during deployment request:", error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Deployment failed" })
  }
})

export { deployRouter }