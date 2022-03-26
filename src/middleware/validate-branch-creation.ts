import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import BadRequestError from "../common/error-handler/BadRequestError";
import DataValidator from "../lib/DataValidator";

const { validateEmail, validateMobile } = DataValidator;
const validateBranchField = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, email, phoneNumber, address, city, state } = req.body;
        const Schema = Joi.object({
            name: Joi.string().min(2).required(),
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                    tlds: { allow: ["com", "net", "org", "info", "io", "ng"] }
                })
                .required(),
            phoneNumber: Joi.string().required(),
            address: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required()
        });
        await Schema.validateAsync({
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            address: address,
            city: city,
            state: state
        });
        if (!validateEmail(email) || !validateMobile(phoneNumber)) {
            return next(new BadRequestError("Provide a valid email/mobile"));
        }
        next();
    } catch (error: any) {
        return next(new BadRequestError(error.message));
    }
};

export default validateBranchField;
