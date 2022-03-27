import { Request, Response, NextFunction } from "express";
import customerServices from "../features/customer/customer.services";
import isValidId from "../lib/is-valid-id";
import BadRequestError from "../common/error-handler/BadRequestError";
import ApplicationError from "../common/error-handler/ApplicationError";
import ForbiddenError from "../common/error-handler/ForbiddenError";

const isCustomerRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try { 
        const id = res.locals.id;
        if (id === undefined || !isValidId(id)) {
            return next(new BadRequestError("The id is invalid"));
        }
        const customer = await customerServices.getOne(id);
        if (!customer) {
            return next(new ForbiddenError("Forbidden : You cannot perform this action"));
        } else {
            next();
        }
    } catch (error: any) {
        return next(new ApplicationError(error.message));
    }
};

export default isCustomerRequest;
