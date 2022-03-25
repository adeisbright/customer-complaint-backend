import {Request , Response , NextFunction} from "express"
import * as jwt from "jsonwebtoken"
import Config from "../config"
import IObjectProps from "./props.interface" 
import BadRequestError from "./error-handler/BadRequestError" 
import ApplicationError from "./error-handler/ApplicationError"
import NotFoundError from "./error-handler/NotFoundError"

const {JWT :  {secret , subject , issuer , expires}} = Config  



interface LoginService {
    getByEmail: (email : string) => Promise<IObjectProps> 
}


class Login {
    service : LoginService

    constructor(service : any){
        this.service = service 
        this.grantAccess = this.grantAccess.bind(this)
        
    }

    async grantAccess(
        req : Request , 
        res : Response , 
        next : NextFunction){
            try{
        
                let {email , password} = req.body 
                let user = await this.service.getByEmail(email) 
                if (!user){
                    return next(new NotFoundError("ERROR 404 : Not Found"))
                }
                let hasCorrectPassword = await user.isCorrectPassword(
                    password
                )
                if(!hasCorrectPassword){
                    return next(new BadRequestError("Incorrect Credentials Provided"))
                }
               
                let token = jwt.sign({id : user._id}, secret, {
                    issuer : issuer , 
                    expiresIn  : expires,
                    algorithm : "HS512", 
                    subject : subject
                })
                
                res.status(200).json({
                    message : "Login was successful" , 
                    body : {
                        data : token
                    }
                })
            }catch(error : any){
                return next(new ApplicationError(error.message))
            }
    }
}

export default Login