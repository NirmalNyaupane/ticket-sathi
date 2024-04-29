import jwt from "jsonwebtoken";
import { EnvConfiguration } from "../config/env.config";
import { UserRole } from "../constants/enums/auth.enum";
import { TokenType } from "../constants/enums/common.enum";
import CustomError from "./customError.util";
import { HTTPStatusCode } from "./helper";
class JwtUtils {
    getPayload(tokenType: TokenType, token: string) {
        if (this.verifyJwt(tokenType, token)) {
            return JSON.parse(atob(token.split(".")[1]));
        }

        return null;
    }

    verifyJwt(tokenType: TokenType, token: string) {
        try {
            switch (tokenType) {
                case TokenType.ACCESS_TOKEN:
                    return jwt.verify(token, EnvConfiguration.ACCESS_TOKEN_SECRET);
                case TokenType.REFRESH_TOKEN:
                    return jwt.verify(token, EnvConfiguration.REFRESH_TOKEN_SECRET);
                case TokenType.FORGOT_PASSWORD:
                    return jwt.verify(token, EnvConfiguration.JWT_FORGOT_PASSWORD_SECRET);
                default:
                    throw new CustomError("Invalid token type", HTTPStatusCode.BAD_REQUEST);
            }
        } catch (error: any) {
            throw new CustomError("Unauthorized", HTTPStatusCode.UNAUTHORIZED);
        }
    }
    generateAccessRefreshToken(payload: { email: string, role: UserRole, id: string }) {
        const accessToken = jwt.sign(
            payload,
            EnvConfiguration.ACCESS_TOKEN_SECRET,
            {
                expiresIn: EnvConfiguration.ACCESS_TOKEN_EXPIRY
            }
        );

        const refreshToken = jwt.sign(
            {
                id: payload.id,
            },
            EnvConfiguration.REFRESH_TOKEN_SECRET,
            {
                expiresIn: EnvConfiguration.REFRESH_TOKEN_EXPIRY
            }
        );

        return { accessToken, refreshToken };
    }

    generateForgotPasswordToken(id: string) {
        return jwt.sign(
            { id },
            EnvConfiguration.JWT_FORGOT_PASSWORD_SECRET,
            {
                expiresIn: EnvConfiguration.JWT_FORGOT_PASSWORD_EXPIRY
            }
        );
    }
}

export default new JwtUtils();