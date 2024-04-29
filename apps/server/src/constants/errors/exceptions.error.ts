import CustomError from "../../utils/customError.util";
import { HTTPStatusCode } from "../../utils/helper";

class NotFoundExceptions extends CustomError {
  constructor(title: string) {
    super(`${title} not found`, HTTPStatusCode.NOT_FOUND);
  }
}

class InternalServerError extends CustomError {
  constructor() {
    super("Internal server error", HTTPStatusCode.INTERNAL_SERVER_ERROR);
  }
}

class InvalidException extends CustomError {
  constructor(message: string) {
    super(message, HTTPStatusCode.INTERNAL_SERVER_ERROR);
  }
}

export { NotFoundExceptions, InternalServerError, InvalidException };
