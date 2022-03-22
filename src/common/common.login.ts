import {Request , Response , NextFunction} from "express"
import * as jwt from "jsonwebtoken"
import Config from "../config"
import IObjectProps from "./props.interface"

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
                    return res.status(404).json({
                        message : "Not admin"
                    })
                }
                let hasCorrectPassword = user.isCorrectPassword(
                    password
                )
                
                if(!hasCorrectPassword){
                    return res.status(400).json({
                        message : "Incorrect password"
                    })
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
                console.log(error)
                res.status(500).json({
                    message : error.message
                })
            }
    }
}

export default Login