import { plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { GraphQLError } from "graphql";
import { MiddlewareFn } from "type-graphql";
import CustomError from "../utils/customError.util";

interface Context {
  req: Request;
  res: Response;
}
export class RequestValidator {
  static validate = (classInstance: any): MiddlewareFn<Context> => {
    return async ({ context }, next: NextFunction) => {
      // express->context
      const { req, res } = context;

      const convertedObject = plainToClass(
        classInstance,
        req.body.variables.data
      );

      await validate(convertedObject).then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          let rawErrors: string[] = [];

          for (const errorItem of errors) {
            //for nested ..
            if (errorItem?.children) {
              for (const i of errorItem?.children) {
                rawErrors.push(...Object.values(i.constraints ?? ""));
              }
            }
            // for non-nested.
            rawErrors.push(...Object.values(errorItem.constraints ?? ""));
          }
          throw new CustomError("Invalid data", 400, rawErrors)
        }
      });

      return next();
    };
  };
}
