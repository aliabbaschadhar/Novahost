import "dotenv/config";
import express from "express";
import cors from "cors";
import { initKafkaConsumer } from "./utils/kafka";
import { deployRouter, logsRouter, projectRouter } from "./routes";

const app = express();
const PORT = 9000;
initKafkaConsumer();

app.use(express.json());
app.use(cors());
app.use("/project", projectRouter);
app.use("/deploy", deployRouter);
app.use("/logs", logsRouter);

app.listen(PORT, () => {
  console.log("Server is listening on port: ", PORT);
});
