import { createClient } from "@clickhouse/client"

export const clickhouseClient = createClient({
  url: process.env.CLICKHOUSE_HOST, // Changed from 'host' to 'url'
  database: "default",
  username: "avnadmin",
  password: process.env.CLICKHOUSE_PASSWORD,
})