import { AuthType, UserRole } from "../../constants/enums/auth.enum";
import { User } from "../../entities/user/user.entity";
import { RegisterValidator } from "../../validators/auth/register.validator";
import bcrypt from "bcrypt";
import mediaService from "../media/media.service";
import CustomError from "../../utils/customError.util";
import { MediaType } from "../../constants/enums/media.enum";
import { OrganizerDocuments } from "../../entities/user/organizerDocuments.entity";
import { OrganizerDetails } from "../../entities/user/organizerDetails.entity";
import { HTTPStatusCode, OtpGenerator } from "../../utils/helper";
class AuthService {
    async findUserByEmail(email: string) {
        return await User.findOne({
            where: { email }
        })
    }

    async findOtpTokenByEmail(email: string) {
        return await User.findOne({
            where: { email },
            select: ["otp", "email", "otpExpires", "id"]
        })
    }

    async findUserPasswordsByEmail(email: string) {
        return await User.findOne({
            where: { email },
            select: ["password", "email", "role", "isVerified", "id", "fullName", "forgotPasswordToken"]
        })
    }

    async findTokenById(id: string) {
        return await User.findOne({
            where: { id },
            select: ["refreshToken", "email", "role", "isVerified", "id", "fullName", "forgotPasswordToken","password"]
        })
    }

    async registerUser(data: RegisterValidator) {
        const hasedPassword = await bcrypt.hash(data.password, 10);
        const user = new User();
        user.fullName = data.fullName;
        user.email = data.email;
        user.phone = data.phone;
        user.password = hasedPassword;
        user.role = data.role;
        user.authType = AuthType.TRADITIONAL;

        const organizerDocuments = new OrganizerDocuments();
        const organizerDetails = new OrganizerDetails();
        if (user.role === UserRole.ORGANIZER) {
            //check media is available or not
            //this is a media comming from database
            const media = await mediaService.findMultipleMediabyIds(data.documents);
            if (!media) {
                throw new CustomError("Please upload documents", HTTPStatusCode.BAD_REQUEST);
            }
            if (media?.includes(null)) {
                throw new CustomError("One or more documents are not available (document id is wrong)"), HTTPStatusCode.BAD_REQUEST;
            }
            //collecting ids of medias
            for (let singleMedia of media) {
                if (singleMedia?.mediaType !== MediaType.ORGANIZER_DOCUMENT) {
                    throw new CustomError(`All documents should be a tyepe of ${MediaType.ORGANIZER_DOCUMENT}`, HTTPStatusCode.BAD_GATEWAY);
                }
            };
            organizerDetails.abnAcn = data.abnAcn
            organizerDetails.address = data.address
            organizerDetails.isGstRegister = data.isGstRegister;
            organizerDetails.organizerName = data.organizerName;

            const organizerDetailsResponse = await organizerDetails.save();

            //@ts-ignore
            organizerDocuments.documents = media;
            const documentResponse = await organizerDocuments.save();
            user.organizerDocuments = documentResponse;
            user.organizerDetails = organizerDetailsResponse;
        }
        const response = await user.save();
        if (!response) throw new CustomError("Internal server error", HTTPStatusCode.INTERNAL_SERVER_ERROR);

        const otp = OtpGenerator();
        const hashOtp = await bcrypt.hash(otp.toString(), 10);
        user.otp = hashOtp;
        user.otpExpires = new Date(Date.now() + 1000 * 60 * 10);
        await user.save();


        return { otp, response }
    }
}

export default new AuthService();