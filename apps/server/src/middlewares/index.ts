import express, { NextFunction, Request, Response } from "express";
import errorHandler from "../middlewares/errorhandler.middleware";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
// @ts-ignore
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
import path from "path";
import fs from "fs";
import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import paymentsuccessController from "../controllers/paymentsuccess.controller";

export const configMiddleware = (
  app: express.Application,
  server: ApolloServer
) => {
  app.use(
    "/graphql",
    express.json(),
    cors({ origin: "*" }),
    graphqlUploadExpress(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );

  app.use(
    "/uploads/*",
    async (req: Request, res: Response, next: NextFunction) => {
      const mediaPath = path.resolve(process.cwd(), "uploads", req?.params[0]);

      fs.createReadStream(mediaPath)
        .on("data", (chunk) => {
          return res.write(chunk);
        })
        .on("error", (error) => {
          return next(new Error("file is not found"));
        })
        .on("end", () => {
          return res.end();
        });
    }
  );

  app.use("/change-order-status", paymentsuccessController.changePaymentStatus);

  app.use(errorHandler);
};
