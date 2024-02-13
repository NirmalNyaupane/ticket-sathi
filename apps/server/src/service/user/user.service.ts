import { User } from "../../entities/user/user.entity";

class UserService {
    async updateUserById(id: string, data: Partial<User>) {
        console.log(id)
        return await User.update(id, { ...data })
    }

    async findUserById(id: string) {
        return await User.findOne({
            where: {
                id
            }
        })
    }

    async getUserDetailsById(id: string) {
        return await User.findOne({
            relations: ["organizerDetails", "organizerDocuments", "profile"],
            where: {
                id
            }
        })
    }

    async findRefreshToken(id: string) {
        return await User.findOne({
            where: {
                id
            },
            select: ["refreshToken","id","email","role"]
        })
    }
}

export default new UserService();