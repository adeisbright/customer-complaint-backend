import adminServices from "./admin.services";
import { Request, Response, NextFunction } from "express";
import ApplicationError from "../../common/error-handler/ApplicationError";
import response from "../../lib/http-response";
import constants from "../../constant";

class AdminController {
    async getAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            response(
                res ,
                constants.statusCode.OK,
                {
                    statusCode : constants.statusCode.OK , 
                    message : "It was ok" , 
                    body : {
                        data : res.locals.id
                    }
                }
                
            )
        } catch (error: any) {
            return next(new ApplicationError(error.message));
        }
    }
}

export default new AdminController();
