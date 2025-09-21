//@ts-nocheck
import { Kafka } from "kafkajs";
import fs from "fs";
import path from "path";
import { clickhouseClient } from "./clickhouse";
import { v4 as uuidv4 } from "uuid";

const kafkaBrokerUrl = process.env.KAFKA_BROKER_URL;
const kafkaPassword = process.env.KAFKA_SASL_PASSWORD;

// if (!kafkaBrokerUrl || !kafkaPassword) {
//   throw new Error("Environment variables are not found!");
// }

const kafka = new Kafka({
  clientId: `api-server`,
  brokers: [kafkaBrokerUrl],
  ssl: {
    ca: [fs.readFileSync(path.join(__dirname, "kafka(ca).pem"), "utf-8")],
  },
  sasl: {
    username: "avnadmin",
    password: kafkaPassword,
    mechanism: "plain",
  },
  retry: {
    retries: 5, // Retry up to 5 times
    initialRetryTime: 300, // Start with 300ms retry delay
    maxRetryTime: 30000, // Maximum retry delay of 30 seconds
  },
  requestTimeout: 30000, // Set a 30-second timeout for requests
});

const consumer = kafka.consumer({ groupId: "api-server-logs-consumer" });

export async function initKafkaConsumer() {
  await consumer
    .connect()
    .then(() => console.log("Kafka consumer connected!"))
    .catch((err) =>
      console.error("Error happened while connection consumer:", err),
    );

  await consumer
    .subscribe({ topics: [`container-logs`] })
    .then(() => console.log("Successfully subscribed to container-logs"))
    .catch((err) => console.error("Unable to subscribe to topics:", err));

  await consumer.run({
    autoCommit: false,
    eachBatch: async function ({
      batch,
      heartbeat,
      commitOffsetsIfNecessary,
      resolveOffset,
    }) {
      const messages = batch.messages;
      console.log(`Received ${messages.length} messages...`);

      for (const message of messages) {
        const stringMessage = message.value?.toString();
        if (!stringMessage) {
          console.warn("Message doesn't exists");
          continue;
        }

        const { projectId, deploymentId, log } = JSON.parse(stringMessage);

        // Add events to clickhouse DB
        const { query_id } = await clickhouseClient.insert({
          table: "log-events",
          values: [{ event_id: uuidv4, deploymentId: deploymentId, log: log }],
          format: "JSONEachRow",
        });

        console.log(JSON.parse(stringMessage));

        resolveOffset(message.offset);
        await commitOffsetsIfNecessary();
        await heartbeat();
      }
    },
  });
}
