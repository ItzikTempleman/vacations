import { UserModel } from "../3-models/user-model";
import jwt, { SignOptions } from "jsonwebtoken";
import { Role } from "../3-models/role";
import crypto from "crypto";
import appConfig from "./app-config";

class Cyber {
    public hash(plainText: string): string {
        const hashText = crypto.createHmac("sha512", appConfig.hashSaltKey).update(plainText).digest("hex");
        return hashText;
    }

    public generateToken(user: UserModel): string {

        delete (user as any).password;
        const container = { user };
        const options: SignOptions = {
            expiresIn: "3h"
        };
        return jwt.sign(container, appConfig.jwtSecretKey, options);
    }

    public verifyToken(token: string): boolean {
        try {
            if (!token) return false;
            jwt.verify(token, appConfig.jwtSecretKey);
            return true;
        } catch (err: any) {
            return false;
        }
    }

    public verifyAdmin(token: string): boolean {
        try {
            if (!token) return false;
            jwt.verify(token, appConfig.jwtSecretKey);
            const container = jwt.decode(token) as {
                user: UserModel
            };
            const user = container.user;
            return user.roleId === Role.Admin;
        } catch (err: any) {
            return false;
        }
    }
};

export const cyber = new Cyber();