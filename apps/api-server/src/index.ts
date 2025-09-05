import "dotenv/config"
import express from "express"
import cors from "cors"
import { z } from "zod"
import { prisma } from "@repo/prismadb/client"
import { StatusCodes } from "http-status-codes"


const app = express()
const PORT = 6000


app.use(express.json())
app.use(cors())

app.post("/user", async (req, res) => {
  const schema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email(),
    password: z.string().regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{5,}$/,
      "Password must be at least 5 characters long and contain at least one letter and one number"
    )
  })

  const schemaResult = schema.safeParse(req.body)

  if (schemaResult.error) {
    return res.status(StatusCodes.FORBIDDEN).json({
      error: schemaResult.error
    })
  }

  const { firstName, lastName, email, password } = schemaResult.data

  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    });
    return res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to create user" });
  }
})

app.listen(PORT, () => {
  console.log("Server is listening on port: ", PORT)
})