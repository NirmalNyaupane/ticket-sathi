import { GraphQLError } from "graphql";

class CustomError extends GraphQLError {
    status?: number;
    message: string;
    errors?: string[];

    constructor(message: string, status?: number, errors?: string[]) {
        super(message, {
            extensions: {
                errors: errors,
                http: {
                    status: status
                }
            }
        });

    }
}

export default CustomError;