import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import Config from "../config";
import IObjectProps from "./props.interface";
import ApplicationError from "./error-handler/ApplicationError";
import NotAuthorizeError from "./error-handler/NotAuthorizeError";

const {
    JWT: { secret, subject, issuer, expires }
} = Config;

interface LoginService {
    getByEmail: (email: string) => Promise<IObjectProps>;
}

class Login {
    service: LoginService;

    constructor(service: LoginService) {
        this.service = service;
        this.grantAccess = this.grantAccess.bind(this);
    }

    async grantAccess(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const user = await this.service.getByEmail(email);
            if (!user) {
                res.set("WWW-Authenticate","Basic realm=Access to login token , charset=UTF-8")
                return next(new NotAuthorizeError("Invalid User Credentials"));
            }
            const hasCorrectPassword = await user.isCorrectPassword(password);
            if (!hasCorrectPassword) {
                res.set("WWW-Authenticate","Basic realm=Access to login token , charset=UTF-8")
                return next(new NotAuthorizeError("Invalid User Credentials"));
            }

            const token = jwt.sign({ id: user._id }, secret, {
                issuer: issuer,
                expiresIn: expires,
                algorithm: "HS512",
                subject: subject
            });

            res.status(200).json({
                statusCode: 200,
                message: "Login was successful",
                body: {
                    data: token
                }
            });
        } catch (error: any) {
            return next(new ApplicationError(error.message));
        }
    }
}

export default Login;
