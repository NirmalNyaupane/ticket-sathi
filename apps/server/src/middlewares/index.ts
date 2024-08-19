import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import errorHandler from "../middlewares/errorhandler.middleware";
import fs from "fs";
// @ts-ignore
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
import path from "path";
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
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use("/change-order-status", paymentsuccessController.changePaymentStatus);

  app.use(errorHandler);
};
