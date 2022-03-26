import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import Config from "../config";
import BadRequestError from "../common/error-handler/BadRequestError";
import ApplicationError from "../common/error-handler/ApplicationError";

const {
    JWT: { secret, subject, issuer }
} = Config;

const authenticateRequst = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { authorization } = req.headers;
        if (authorization === undefined || authorization === "") {
            return next(new BadRequestError("Provide Authorizatin Header"));
        }
        let bearer;
        let token = "";
        if (authorization !== undefined) {
            [bearer, token] = authorization.split(" ");
        }

        if (bearer !== "Bearer") {
            return next(
                new BadRequestError("Bad Request  :Invalid Authorization")
            );
        }

        const payload: jwt.JwtPayload = jwt.verify(token, secret, {
            issuer,
            subject
        }) as jwt.JwtPayload;

        res.locals.id = payload.id;
        next();
    } catch (error: any) {
        return next(new ApplicationError(error.message));
    }
};

export default authenticateRequst;
