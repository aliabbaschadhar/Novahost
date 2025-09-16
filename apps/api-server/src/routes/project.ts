import { Router } from "express";
import { projectSchema } from "../schemas/schema";
import { StatusCodes } from 'http-status-codes'
import { prisma } from "@repo/prismadb/client";
import { generateSlug } from "random-word-slugs"

export const projectRouter = Router()

projectRouter.post('/', async (req, res) => {
  const safeParseResult = projectSchema.safeParse(req.body);

  if (safeParseResult.error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: safeParseResult.error
    })
  }

  try {
    const { name, gitURL } = safeParseResult.data;

    const project = await prisma.project.create({
      data: {
        name: name,
        gitURL: gitURL,
        subdomain: generateSlug()
      }
    })

    res.status(StatusCodes.CREATED).json({
      msg: "Project created!",
      data: { project }
    })

  } catch (error) {
    console.error("Error while creating a project", error)
  }
})