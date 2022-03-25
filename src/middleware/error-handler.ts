import { Request , Response , NextFunction} from "express"; 
import ApplicationError from "../common/error-handler/ApplicationError";
import BadRequestError from "../common/error-handler/BadRequestError"; 
import ForbiddenError from "../common/error-handler/ForbiddenError";
import NotAuthorizeError from "../common/error-handler/NotAuthorizeError";
import response , {IBody} from "../lib/http-response"
import ErrorAlert from "../common/monitoring/ErrorAlert"
import fileLogger from "../common/logging/file-logger"

type ErrorType = ApplicationError | BadRequestError  | NotAuthorizeError | ForbiddenError

const errorHandler = (
  err : ErrorType,  
  req : Request , 
  res : Response , 
  next : NextFunction) => {
    
    let errorAlert = new ErrorAlert(err.message, err.name);
    errorAlert.notify();

    const errorMessage = `${req.ip} : ${req.method} ${req.url} ${err.statusCode} :${err.name} ${err.message} `;

    fileLogger.log({
        message: errorMessage,
        level: "error",
    });

    let {statusCode , message} = err
    let body : IBody = {
      message : message , 
      statusCode : err.statusCode  ? err.statusCode : 500, 
      body : {
          data : err.message
      }
    }
    
    statusCode = statusCode ? statusCode : 500
    if (err instanceof ApplicationError){
      body.message = "ERROR 500 : INTERNAL SERVER ERROR"
      response(res , statusCode , body)
    }else{
      response(res , statusCode , body)
    }
}

export default errorHandler