import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import isValidId from "../lib/is-valid-id";
import BadRequestError from "../common/error-handler/BadRequestError";
import DataValidator from "../lib/DataValidator";

const { validateMobile } = DataValidator;

const validateManagerData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            firstName,
            lastName,
            email,
            branch,
            phoneNumber,
            address,
            state,
            city
        } = req.body;
        if (req.file){
            console.log("The file")
            console.log(req.file)
        }else{
            console.log("No file")
        }
        if (branch === undefined || !isValidId(branch)) {
            return res.status(400).json({
                message: "Provide a valid branch ID"
            }); 
        }
        const Schema = Joi.object({
            firstName: Joi.string().min(2).required(),
            lastName: Joi.string().min(2).required(),
            email: Joi.string()
                .email()
                .required(),
            phoneNumber: Joi.string().required()
        });
        const CustomerSchema = Joi.object({
            address: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required()
        });
        if (!validateMobile(phoneNumber)) {
            return next(new BadRequestError("Provide a valid mobile"));
        }
        await Schema.validateAsync({
            firstName,
            lastName,
            email,
            phoneNumber
        });

        if (req.url.endsWith("customers")) {
            await CustomerSchema.validateAsync({
                address,
                city,
                state
            });
        }

        next();
    } catch (error: any) {
        return next(new BadRequestError(error.message));
    }
};

export default validateManagerData;
