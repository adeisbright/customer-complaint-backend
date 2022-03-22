import {Request , Response , NextFunction} from "express" 
import Joi from "joi"

const validateBranchField = async (
    req : Request , 
    res : Response , 
    next : NextFunction
) => {
    try {
        const {
            name , 
            email , 
            phoneNumber , 
            address , 
            city , 
            state
        } = req.body  
        const Schema = Joi.object({
            name : Joi.string()
                    .min(2)
                    .required(),
            email : Joi.string().email({
                        minDomainSegments: 2,
                        tlds: { allow: ["com", "net" , "org" , "info" , "io" , "ng"] }
                    }).required(),
            phoneNumber : Joi.string()
                .required() , 
            address : Joi.string().required() , 
            city : Joi.string().required() , 
            state : Joi.string().required() , 
        })
        const {error , _} = await Schema.validateAsync({
            name : name,
            email : email , 
            phoneNumber : phoneNumber , 
            address : address , 
            city : city , 
            state : state
        })
        next()
    }catch(error  :any){
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}

export default validateBranchField