import {Request , Response , NextFunction} from "express" 
import Joi from "joi"
import isValidId from "../lib/is-valid-id" 

const validateManagerData = async (
    req : Request , 
    res : Response , 
    next : NextFunction
) => {
    try {
        const {
            firstName , 
            lastName , 
            email , 
            branch , 
            phoneNumber , 
        } = req.body  

        if (branch === undefined || !isValidId(branch)){
            return res.status(400).json({
                message : "Provide a valid branch ID"
            })
        }
        const Schema = Joi.object({
            firstName : Joi.string()
                    .min(2)
                    .required(),
            lastName : Joi.string()
                    .min(2)
                    .required(),
            email : Joi.string().email({
                        minDomainSegments: 2,
                        tlds: { allow: ["com", "net" , "org" , "info" , "io" , "ng"] }
                    }).required(),
            phoneNumber : Joi.string()
                .required() 
        })
        const {error , _} = await Schema.validateAsync({
            firstName : firstName,
            lastName : lastName,
            email : email , 
            phoneNumber : phoneNumber 
        })
        next()
    }catch(error  :any){
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}

export default validateManagerData