import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@repo/prismadb/client"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { Resend } from "resend"
import bcrypt from "bcryptjs"

const nextAuthUrl = process.env.NEXTAUTH_URL
const nextAuthSecret = process.env.NEXTAUTH_SECRET
const databaseUrl = process.env.DATABASE_URL
const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
const githubClientId = process.env.GITHUB_CLIENT_ID
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET
const resendApiKey = process.env.RESEND_API_KEY
const emailFrom = process.env.EMAIL_FROM

if (
  !nextAuthUrl ||
  !nextAuthSecret ||
  !databaseUrl ||
  !googleClientId ||
  !googleClientSecret ||
  !githubClientId ||
  !githubClientSecret ||
  !resendApiKey ||
  !emailFrom
) {
  throw new Error("Missing required environment variables")
}


const resend = new Resend(resendApiKey);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma), // configures the prisma adapter to use the prisma client instance
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret
    }),
    GitHubProvider({
      clientId: githubClientId,
      clientSecret: githubClientSecret
    }),
    CredentialsProvider(
      {
        name: "credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" }
        },
        // Check whether the user exists in the database
        async authorize(credentials) {
          if (!credentials?.email || !credentials.password) {
            return null;
          }
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          })
          if (!user || !user.password) {
            return null;
          }
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )
          if (!isPasswordValid) {
            return null
          }
          return {
            id: user.id,
            email: user.email,
            name: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` || "Shaka G" : user.email
          }
        },
      })
  ],
  // Configure the session to use JWTs
  session: { strategy: "jwt" },
  //
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        //@ts-ignore
        session.user.id = token.id as string
      }
      return session
    },
  },
  events: {
    async createUser({ user }) {
      // Send welcoming email
      if (user.email) {
        await resend.emails.send({
          from: emailFrom,
          to: user.email,
          subject: "Welcome to Novahost!",
          html: `
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 30px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <h1 style="font-size: 24px; color: #333; margin-bottom: 20px;">Welcome ${user.name} to Novahost!</h1>
              <p style="font-size: 16px; color: #666; line-height: 1.6;">Thanks for joining Novahost. We're excited to have you on board!</p>
              <p style="font-size: 16px; color: #666; line-height: 1.6;">Feel free to explore our platform and discover the amazing features we offer.</p>
              <p style="font-size: 16px; color: #666; line-height: 1.6;">If you have any questions, don't hesitate to contact our support team.</p>
              <a href="#" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Get Started</a>
            </div>
          </body>
        `
        })
      }
    }
  }
}