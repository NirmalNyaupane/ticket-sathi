import { Request } from "express";
import { User } from "../entities/user/user.entity";
interface Context {
    req: Request;
    res: Response;
    user?: User
}

export { Context }