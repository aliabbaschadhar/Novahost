import "dotenv/config"
import { Kafka } from "kafkajs"
import fs from "fs"
import path from "path"
import { PutObjectAclCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { execSync } from "child_process";
import mime from "mime-types"


const accessKeyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
const endpoint = process.env.S3_ENDPOINT;
const bucket = process.env.BUCKET;
const gitUrl = process.env.GIT_REPOSITORY_URL;
const projectId = process.env.PROJECT_ID;
const deploymentId = process.env.DEPLOYMENT_ID;
const brokerUrl = process.env.KAFKA_BROKER_URL;
const kafkaPassword = process.env.KAFKA_SASL_PASSWORD;

if (!accessKeyId ||
  !secretAccessKey ||
  !endpoint ||
  !bucket ||
  !gitUrl ||
  !projectId ||
  !deploymentId ||
  !brokerUrl ||
  !kafkaPassword
) {
  throw new Error("Missing required environment variables")
}

console.log(`Access Key ID: ${accessKeyId} \nSecret Access Key: ${secretAccessKey} \nEndpoint: ${endpoint} \nBucket: ${bucket} \nGit URL: ${gitUrl} \nProject ID: ${projectId} \nDeployment ID: ${deploymentId} \nBroker URL: ${brokerUrl} \nKafka Password: ${kafkaPassword} \n`);

const kafka = new Kafka({
  clientId: `docker-build-server-${deploymentId}`,
  brokers: [brokerUrl],
  ssl: {
    ca: [fs.readFileSync(path.join(__dirname, 'kafka(ca).pem'), "utf-8")]
  },
  sasl: {
    username: "avnadmin",
    password: kafkaPassword,
    mechanism: "plain"
  }
})

const producer = kafka.producer()

async function publishLog(log: string) {
  await producer.send({
    topic: `container-logs`,
    messages: [{
      key: "log",
      value: JSON.stringify({
        projectId,
        deploymentId,
        log
      })
    }]
  })
}

const s3Client = new S3Client({
  region: "auto",
  endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  }
})

async function init() {
  try {
    await producer.connect()
      .catch(err => console.error("Error while connecting to producer: ", err))

    console.log("Executing build-server...")
    await publishLog("Build Started...")

    const outDirPath = path.join(__dirname, "output")
    await publishLog("Removing last project from output folder...")

    execSync(`rm -rf ${outDirPath}`)

    await publishLog(`Cloning the project to output directory...`)

    execSync(`git clone ${gitUrl} ${outDirPath}`)

    await publishLog("Install deps and building the project ... ")

    execSync(`cd ${outDirPath} && bun install && bun run build`)

    process.stdout?.on("data", async (data: Buffer) => {
      console.log(data.toString())
      await publishLog(data.toString())
    })

    process.stdout?.on("error", async (data: Buffer) => {
      console.error("Error: ", data.toString())
      await publishLog(`Error: ${data.toString()}`)
    })

    process.on("close", async () => {
      console.log("Building completed!!!")

      await publishLog("Building Done Love :) ")
      const distFolderPath = path.join(__dirname, "output", "dist")
      const distFolderContents = fs.readdirSync(distFolderPath, {
        recursive: true
      })

      await publishLog("Reading the files/directories and their contents...")

      for (const file of distFolderContents) {
        const filePath = path.join(distFolderPath, file as string)
        if (fs.lstatSync(filePath).isDirectory()) {
          continue;
        }

        const fileSize = fs.statSync(filePath).size

        console.log(`Uploading the ${filePath} :: (${fileSize} bytes)`)

        // Use readFileSync for small files (<5MB), createReadStream for larger files
        const fileBody = fileSize < 5 * 1024 * 1024 ? fs.readFileSync(filePath) : fs.createReadStream(filePath)

        const command = new PutObjectCommand({
          Bucket: bucket,
          Key: `__outputs/${projectId}/${file}`,
          Body: fileBody,
          ContentType: mime.lookup(filePath) || undefined
        })

        await publishLog(`Uploading file: ${file}`)
        await s3Client.send(command)

        console.log(`File uploaded:__outputs/${projectId}/${file}`)
        await publishLog(`File upload done at __outputs/${projectId}/${file}`)
      }

      console.log("Upload done completely")
      await publishLog("Upload done completely")

      console.log("Build completed successfully!")

      //Shutting down the pod
      console.log("Shutting down the POD...");
      setTimeout(() => process.exit(0), 1000)
    })
  } catch (error) {
    console.error("Build failed: ", error);
    setTimeout(() => process.exit(1), 1000)
    // We will get to know of state of process exit by their code.
  }
}

init().catch((err) => {
  console.error("Unhandled error in build-server:", err);
  setTimeout(() => process.exit(1), 1000);
});