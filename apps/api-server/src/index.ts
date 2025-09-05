import "dotenv/config"
import express from "express"
import cors from "cors"
import { userRouter } from "./routes/user"



const app = express()
const PORT = 6000


app.use(express.json())
app.use(cors())

// Routes
app.use("/user", userRouter)


app.listen(PORT, () => {
  console.log("Server is listening on port: ", PORT)
})