import adminServices from "./admin.services";
import {Request , Response , NextFunction} from "express"
import ApplicationError from "../../common/error-handler/ApplicationError";
import response from "../../lib/http-response";
import constants from "../../constant";

class AdminController {
    
    async getAdmin(req  : Request , res : Response , next  :NextFunction){
        try {
            console.log(res.locals.id)
            res.status(500).json({message : "Hello"})
            // response(
            //     res , 
            //     constants.statusCode.OK , 
            //     body : {
            //         message : "Welcome" , 
            //         statusCode : constants.statusCode.OK , 
            //         data : {}
            //     }
            // )
        }catch(error  : any){
            return next(new ApplicationError(error.message))
        }
    }
}

export default new AdminController()