import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { RequestValidator } from "../../middlewares/requestValidator.middleware";
import { LoginUserResponse, RegisterUserResponse, RegisterUserSchema } from "../../schemas/user/auth.schemas";
import authService from '../../service/auth/auth.service';
import CustomError from "../../utils/customError.util";
import { MailType } from "../../utils/email.util";
import QueueUtil from "../../utils/queue.util";
import { ForgotPasswordRequestValidator, LoginValidator, OtpVerifyValidator, RegisterValidator, ResetForgotPasswordValidator } from "../../validators/auth/register.validator";
import bcrypt from "bcrypt";
import userService from "../../service/user/user.service";
import { CommonResponse } from "../../schemas";
import { HTTPStatusCode, OtpGenerator } from "../../utils/helper";
import jwtUtil from "../../utils/jwt.util";
import { EnvConfiguration } from "../../config/env.config";
import { TokenType } from "../../constants/enums/common.enum";
import { UserRole } from "../../constants/enums/auth.enum";
import { AccessTokenResponse } from "../../schemas/user/user.schema";
@Resolver()
class AuthResolver {
    @Mutation(() => RegisterUserResponse)
    @UseMiddleware(RequestValidator.validate(RegisterValidator))
    async registerUser(@Arg("data") userData: RegisterUserSchema): Promise<RegisterUserResponse> {
        //check if user is already registered or not with email
        const user = await authService.findUserByEmail(userData.email)
        if (user) {
            throw new CustomError("User is already registered", HTTPStatusCode.BAD_REQUEST);
        }
        const { otp, response } = await authService.registerUser(userData);

        QueueUtil.addEmailJob({
            to: userData.email,
            mailType: MailType.REGISTRATION,
            subject: "Verify your email",
            data: {
                name: userData.fullName,
                otp: otp
            }
        })

        return {
            message: "User is created sucessfully, please check your email for verification", status: "success", user: {
                id: response.id,
                email: response.email,
                role: response.role,
                isVerified: response.isVerified
            }
        }
    }


    @Mutation(() => CommonResponse)
    @UseMiddleware(RequestValidator.validate(OtpVerifyValidator))
    async verifyOtp(@Arg("data") userData: OtpVerifyValidator): Promise<CommonResponse> {
        const user = await authService.findOtpTokenByEmail(userData.email);
        if (!user) {
            throw new CustomError("User not found", HTTPStatusCode.BAD_REQUEST);
        }
        const { otp, otpExpires, id } = user;
        if (!otp) {
            throw new CustomError("Otp not found", HTTPStatusCode.BAD_REQUEST);
        }
        if (!otpExpires) {
            throw new CustomError("Internal server error", HTTPStatusCode.INTERNAL_SERVER_ERROR);
        }
        //check if the otp token is expired or not
        if (new Date(otpExpires).getTime() < new Date().getTime()) {
            throw new CustomError("Otp is expired", HTTPStatusCode.BAD_REQUEST);
        }
        const isOtpVerified = await bcrypt.compare(userData.otp, otp);
        if (!isOtpVerified) {
            throw new CustomError("Invalid otp", HTTPStatusCode.BAD_REQUEST);
        }
        const updatedResponse = await userService.updateUserById(id, { isVerified: true });

        if (updatedResponse.affected === 1) {
            return { message: "User verified successfully", status: "success" }
        } else {
            throw new CustomError("Internal server error", HTTPStatusCode.INTERNAL_SERVER_ERROR);
        }
    }


    @Mutation(() => LoginUserResponse)
    @UseMiddleware(RequestValidator.validate(LoginValidator))
    async login(@Arg("data") userData: LoginValidator): Promise<LoginUserResponse> {
        const user = await authService.findUserPasswordsByEmail(userData.email);
        if (!user) {
            throw new CustomError("User not found", HTTPStatusCode.BAD_REQUEST);
        }

        if (!user.isVerified) {
            //TODO: send otp on mail
            const otp = OtpGenerator();
            const hashOtp = await bcrypt.hash(otp.toString(), 10);
            const updateResponse = await userService.updateUserById(user.id, { otp: hashOtp, otpExpires: new Date(Date.now() + 1000 * 60 * 10) });

            if (updateResponse.affected === 1) {
                QueueUtil.addEmailJob({
                    to: userData.email,
                    mailType: MailType.EMAIL_VERIFICATION,
                    subject: "Verify your email",
                    data: {
                        name: user.fullName,
                        otp: otp
                    }
                })
            }
            throw new CustomError("User is not verified", HTTPStatusCode.UNAUTHORIZED);
        }
        //TODO: do not allowed to organizer to login more than five days when it is in PENDING status

        //check password
        const isPasswordMatched = await bcrypt.compare(userData.password, user.password);
        if (!isPasswordMatched) {
            throw new CustomError("Invalid Credentials", HTTPStatusCode.BAD_REQUEST);
        }

        const { accessToken, refreshToken } = jwtUtil.generateAccessRefreshToken({ id: user.id, email: user.email, role: user.role });
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

        const updatedUser = await userService.updateUserById(user.id, { refreshToken: hashedRefreshToken });

        if (updatedUser.affected == 1) {
            return { message: "User logged in successfully", status: "success", id: user.id, refreshToken: refreshToken, accessToken: accessToken, role: user.role, isVerified: user.isVerified }
        } else {
            throw new CustomError("Internal server error", HTTPStatusCode.INTERNAL_SERVER_ERROR);
        }
    }

    @Mutation(() => CommonResponse)
    async forgotPasswordRequest(@Arg("data") userData: ForgotPasswordRequestValidator) {
        const user = await authService.findUserByEmail(userData.email);
        if (!user) {
            throw new CustomError("User not found", HTTPStatusCode.BAD_REQUEST);
        }
        const forgotPasswordToken = jwtUtil.generateForgotPasswordToken(user.id);
        const hashedForgotPasswordToken = await bcrypt.hash(forgotPasswordToken, 10);
        const updateResponse = await userService.updateUserById(user.id, { forgotPasswordToken: hashedForgotPasswordToken });
        const passwordResetLink = `${EnvConfiguration.FRONTEND_URL}/forgot-password?token=${forgotPasswordToken}`;
        if (updateResponse.affected === 1) {
            QueueUtil.addEmailJob({
                to: userData.email,
                mailType: MailType.FORGOT_PASSWORD,
                subject: "Reset your password",
                data: {
                    name: user.fullName,
                    link: passwordResetLink,
                }
            })
            return { message: "Password reset request sent successfully", status: "success" }
        } else {
            throw new CustomError("Internal server error", HTTPStatusCode.INTERNAL_SERVER_ERROR);
        }
    }

    @Mutation(() => CommonResponse)
    @UseMiddleware(RequestValidator.validate(ResetForgotPasswordValidator))
    async resetForgotPassword(@Arg("data") data: ResetForgotPasswordValidator): Promise<CommonResponse> {
        const { token, password } = data;
        const { id } = jwtUtil.getPayload(TokenType.FORGOT_PASSWORD, token);
        if (!id) {
            throw new CustomError("Internal server error", 500)
        }
        const user = await authService.findTokenById(id);
        if (!user) {
            throw new CustomError("User not found", HTTPStatusCode.BAD_REQUEST);
        }

        const isForgotPasswordValid = await bcrypt.compare(token, user?.forgotPasswordToken ?? "");

        if (!isForgotPasswordValid) {
            throw new CustomError("Token is expired", HTTPStatusCode.BAD_REQUEST);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const updateResponse = await userService.updateUserById(id, { password: hashedPassword });

        if (updateResponse.affected === 1) {
            return { message: "Password reset successfully", status: "success" };
        } else {
            throw new CustomError("Internal server error", HTTPStatusCode.INTERNAL_SERVER_ERROR);
        }
    }

    @Mutation(() => AccessTokenResponse)
    async getAccessToken(@Arg("refreshToken") refreshToken: string): Promise<AccessTokenResponse> {
        const { id } = jwtUtil.getPayload(TokenType.REFRESH_TOKEN, refreshToken);

        if (!id) {
            throw new CustomError("Internal server error", HTTPStatusCode.INTERNAL_SERVER_ERROR);
        }

        const user = await userService.findRefreshToken(id);
        const isRefreshTokenValid = await bcrypt.compare(refreshToken, user?.refreshToken as string);

        if (!isRefreshTokenValid) {
            throw new CustomError("Refresh token does not matched", HTTPStatusCode.BAD_REQUEST)
        }
        const { accessToken } = jwtUtil.generateAccessRefreshToken({ email: user?.email || "", role: user?.role || UserRole.USER, id });
        return { accessToken }
    }
}

export { AuthResolver };

