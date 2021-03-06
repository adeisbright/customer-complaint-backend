import { Request, Response, NextFunction } from "express";
import ApplicationError from "../common/error-handler/ApplicationError";
import BadRequestError from "../common/error-handler/BadRequestError";
import ForbiddenError from "../common/error-handler/ForbiddenError";
import NotAuthorizeError from "../common/error-handler/NotAuthorizeError";
import response, { IBody } from "../lib/http-response";
import ErrorAlert from "../common/monitoring/ErrorAlert";
import fileLogger from "../common/logging/file-logger";
import messageSlack from "../lib/messageSlact"
import messageTelegram from "../lib/messageTelegram"
import Config from "../config";

type ErrorType =
    | ApplicationError
    | BadRequestError
    | NotAuthorizeError
    | ForbiddenError;

const errorHandler = (
    err: ErrorType,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errorAlert = new ErrorAlert(err.message, err.name);
    errorAlert.notify();
    
    const errorMessage = `${req.ip} : ${req.method} ${req.url} ${err.statusCode} :${err.name} ${err.message} `;

    messageTelegram(errorMessage)
    messageSlack(errorMessage , Config.slackChannel)

    fileLogger.log({
        message: errorMessage,
        level: "error"
    });

    const { statusCode, message } = err;
    const body: IBody = {
        message: message,
        statusCode: err.statusCode ? err.statusCode : 500,
        body: {
            data: err.message
        }
    };

    const resStatusCode = statusCode ? statusCode : 500;
    if (err instanceof ApplicationError) {
        body.message = "ERROR 500 : INTERNAL SERVER ERROR";
        response(res,  body);
    } else {
        response(res,  body);
    }
};

export default errorHandler;
