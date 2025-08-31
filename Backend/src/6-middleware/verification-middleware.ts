import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import appConfig from "../2-utils/app-config";
import { UserModel } from "../3-models/user-model";
import { Role } from "../3-models/role";
import StatusCode from "../3-models/status-code";
import { AuthorizationError } from "../3-models/error-models";

class VerificationMiddleware {
    public readonly verifyIsUser = (request: Request, response: Response, next: NextFunction) => {
        try {
            const authHeader = (request.headers as any)["authorization"] as string | undefined;
            const userJWT = authHeader?.split(" ")[1];

            if (!userJWT) {
                throw new AuthorizationError("Missing valid user");
            }

            const payload = jwt.verify(userJWT, appConfig.jwtSecretKey) as { user: UserModel };
           
            if (payload.user.roleId === Role.Admin) {
                return response.status(StatusCode.Forbidden).send("Admin cannot like a vacation - restricted to regular users")
            }

            (request as any).user = payload.user;

            next();
        } catch (err: any) {
            return response.status(StatusCode.Unauthorized).send("Unauthorized");
        }
    }

    
    public readonly verifyIsAdmin = (request: Request, response: Response, next: NextFunction) => {
        try {
            const authHeader = (request.headers as any)["authorization"] as string | undefined;
            const userJWT = authHeader?.split(" ")[1];

            if (!userJWT) {
                throw new AuthorizationError("Missing valid user");
            }

            const payload = jwt.verify(userJWT, appConfig.jwtSecretKey) as { user: UserModel };
           
            if (payload.user.roleId === Role.User) {
                return response.status(StatusCode.Forbidden).send("Regular user cannot add, edit or remove a vacation - restricted to admin")
            }

            (request as any).user = payload.user;

            next();
        } catch (err: any) {
            return response.status(StatusCode.Unauthorized).send("Unauthorized");
        }
    }

      public readonly verifyLoggedIn = (request: Request, response: Response, next: NextFunction) => {
    try {
      const authHeader = (request.headers as any)["authorization"] as string | undefined;
      const userJWT = authHeader?.split(" ")[1];
      if (!userJWT) throw new AuthorizationError("Missing valid user");

      const payload = jwt.verify(userJWT, appConfig.jwtSecretKey) as { user: UserModel };

    
      (request as any).user = payload.user;

      next();
    } catch {
      return response.status(StatusCode.Unauthorized).send("Unauthorized");
    }
  }

}

export const verificationMiddleware = new VerificationMiddleware();



