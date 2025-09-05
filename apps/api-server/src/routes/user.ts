import { Router } from "express";
import { prisma } from "@repo/prismadb/client"
import { StatusCodes } from "http-status-codes"
import { signupSchema, signinSchema } from "../schemas/schema";
import bcrypt from "bcrypt"

export const userRouter = Router()

userRouter.post("/signup", async (req, res) => {
  const schemaResult = signupSchema.safeParse(req.body)

  if (schemaResult.error) {
    return res.status(StatusCodes.FORBIDDEN).json({
      error: schemaResult.error
    })
  }
  const { firstName, lastName, email, password } = schemaResult.data

  try {
    const existingUser = await prisma.user.findFirst({ where: { email: email } })

    if (existingUser) {
      return res.json({
        msg: "User already exists!"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });
    return res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to create user" });
  }
})

userRouter.post("/signin", async (req, res) => {
  const schemaResult = signinSchema.safeParse(req.body)
  if (schemaResult.error) {
    return res.json({
      error: `Error happened while parsing: ${schemaResult.error}`
    })
  }

  const { email, password } = schemaResult.data;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email
      }
    });

    if (!existingUser) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid email or password" });
    }

    // You can generate and return a token here if needed
    return res.status(StatusCodes.OK).json({ msg: "Signin successful", user: existingUser });

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Signin failed" });
  }
})