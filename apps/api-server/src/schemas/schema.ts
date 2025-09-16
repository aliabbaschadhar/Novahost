import { z } from "zod";

export const projectSchema = z.object({
  name: z.string(),
  gitURL: z.url()
})

export const deploySchema = z.object({
  projectId: z.string(),
})