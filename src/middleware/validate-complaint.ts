import {Request , Response , NextFunction} from "express" 
import Joi from "joi"
import BadRequestError from "../common/error-handler/BadRequestError"

const validateComplaint = async (
    req : Request , 
    res : Response , 
    next : NextFunction
) => {
    try {
        const {
            title , 
            message , 
            customer , 
            branch, 
        } = req.body  

        const Schema = Joi.object({
            title : Joi.string()
                    .min(2)
                    .required(),
            message  : Joi.string()
            .min(2)
            .required(),
            customer : Joi.string().required() , 
            branch : Joi.string().required() 
        })
        await Schema.validateAsync({
           title , 
           message , 
           customer , 
           branch
        })
        next()
    }catch(error  :any){
        return next(new BadRequestError(error.message))
    }
}

export default validateComplaint