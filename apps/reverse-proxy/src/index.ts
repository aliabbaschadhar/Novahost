import "dotenv/config";
import express from "express";
import httpProxy from "http-proxy";
import { prisma } from "@repo/prismadb/client";

const app = express();
const PORT = 8000;
const BASE_PATH = process.env.BASE_PATH;
const proxy = httpProxy.createProxyServer();

app.use((req, res) => {
  const host = req.hostname;
  const projectId = host.split(".")[0];

  //TODO: Find the specific project based on the subDomain given by user
  //TODO: Then use that projectId

  if (req.path === "/") {
    req.url = "/index.html";
  }

  const resolveTo = `${BASE_PATH}/${projectId}`;

  return proxy.web(req, res, {
    target: resolveTo,
    changeOrigin: true,
  });
});

app.listen(PORT, () => {
  console.log(`Reverse proxy is running on ${PORT}`);
});
