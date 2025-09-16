import { Router } from "express";
import { clickhouseClient } from "../utils/clickhouse";
import { StatusCodes } from "http-status-codes";

export const logsRouter = Router();

logsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const logs = await clickhouseClient.query({
      query: `SELECT event_id, deployment_id, log, timestamp FROM log_events WHERE deployment_id = {deployment_id:String}`,
      query_params: {
        deployment_id: id,
      },
      format: "JSONEachRow",
    });
    const rawLogs = await logs.json();
    return res.status(StatusCodes.OK).json({
      logs: rawLogs,
    });
  } catch (error) {
    console.error("Error fetching logs:", error);
    return res.status(500).json({ error: "Failed to fetch logs" });
  }
});
