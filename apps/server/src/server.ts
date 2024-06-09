import "reflect-metadata";
import express from "express";
import { EnvConfiguration } from "./config/env.config";
import { AppDataSource } from "./config/database.config";
import { configMiddleware } from "./middlewares";
import http from "http";
import configGraphQLServer from "./config/graphql.config";
import RedisUtil from "./utils/redis.util";
import QueueUtil from "./utils/queue.util";
import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
class Server {
  constructor() {
    this.bootstrap();
  }

  // bootstrap
  async bootstrap() {
    AppDataSource.initialize()
      .then(async () => {
        console.log("Data Source has been initialized!");

        const app = express();
        const httpServer = http.createServer(app);
        const server = configGraphQLServer(httpServer);
        await server.start();

        configMiddleware(app, server);
        new RedisUtil().initiate();
        const emailQueue = new QueueUtil().initiate();

        const serverAdapter = new ExpressAdapter();
        serverAdapter.setBasePath("/admin/queues");
        const { addQueue } = createBullBoard({
          queues: [new BullMQAdapter(emailQueue!)],
          serverAdapter,
        });
        app.use("/admin/queues", serverAdapter.setQueues);
        httpServer.listen(EnvConfiguration.PORT, () => {
          console.log(
            `Server started at http://localhost:${EnvConfiguration.PORT}/graphql 🚀🚀🚀`
          );
        });
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  }
}

new Server();
