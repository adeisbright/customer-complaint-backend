import { Request , Response , NextFunction } from "express";
import * as jwt from "jsonwebtoken"
import Config from "../config";

const {JWT :  {secret , subject , issuer}} = Config


const authenticateRequst = async (
    req : Request , 
    res : Response, 
    next  :NextFunction) => {
    try{
        const {authorization} = req.headers 
        if (authorization === undefined || authorization === ""){
            return res.status(400).json({
                message : "Bad Request  :Provide authorization header" , 
                id:""
            })
        }
        const [bearer , token] = authorization.split(" ") 
        
        if (bearer !== "Bearer"){
            return res.status(400).json({
                message : "Bad Request  :Invalid Authorization",
                id : ""
            })
        }

        let payload: jwt.JwtPayload  = jwt.verify(
            token ,
            secret , {
            issuer , 
            subject
        }) as jwt.JwtPayload

        res.locals.id = payload.id
        next()

    }catch(error : any){
        console.log(error)
        res.status(500).json({
            message : "You dey feelam",
            id : ""
        })
    }
}

export default authenticateRequst