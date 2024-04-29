import { NextFn } from "type-graphql";
import { UserRole } from "../constants/enums/auth.enum";
import { Context } from "../types/context.type";
import { HTTPStatusCode } from "../utils/helper";
import CustomError from "../utils/customError.util";
import jwtUtil from "../utils/jwt.util";
import { TokenType } from "../constants/enums/common.enum";
import userService from "../service/user/user.service";

const authentication = (userRoles?: UserRole[]) => {
    return async ({ context }: { context: Context }, next: NextFn) => {
        const authorizationToken = context.req.headers?.authorization;
        if (!authorizationToken) {
            throw new CustomError("Unauthorized", HTTPStatusCode.UNAUTHORIZED)
        }

        const [bearer, token] = authorizationToken.split(" ");
        if (bearer && token) {
            if (bearer !== "Bearer") {
                throw new CustomError("Unauthorized", HTTPStatusCode.UNAUTHORIZED);
            }
            const { id } = jwtUtil.getPayload(TokenType.ACCESS_TOKEN, token);
            const user = await userService.findUserById(id);
            if (!user) {
                throw new CustomError("Token is invalid", HTTPStatusCode.BAD_REQUEST)
            }
            if (userRoles) {
                if (!userRoles.includes(user?.role as UserRole)) {
                    throw new CustomError("Forbidden", HTTPStatusCode.FORBIDDEN);
                }
            }
            context.user = user
            return next();
        } else {
            throw new CustomError("Unauthorized", HTTPStatusCode.UNAUTHORIZED);
        }
    }
}

export default authentication;