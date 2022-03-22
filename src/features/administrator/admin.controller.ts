import adminServices from "./admin.services";
import {Request , Response , NextFunction} from "express"

class AdminController {
    
    async getAdmin(req  : Request , res : Response , next  :NextFunction){
        try {
            console.log(res.locals.id)
            res.status(500).json({message : "Hello"})
        }catch(error  : any){
            console.log(error)
            res.status(500).json({
                message : error.message
            })
        }
    }
}

export default new AdminController()