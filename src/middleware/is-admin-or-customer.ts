import { Request, Response, NextFunction } from "express";
import adminServices from "../features/administrator/admin.services";
import customerServices from "../features/customer/customer.services"; 
import managerServices from "../features/manager/manager.services";
import isValidId from "../lib/is-valid-id";
import BadRequestError from "../common/error-handler/BadRequestError";
import ApplicationError from "../common/error-handler/ApplicationError";
import ForbiddenError from "../common/error-handler/ForbiddenError";

const isCustomerOrManager = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = res.locals.id;
        if (id === undefined || !isValidId(id)) {
            return next(new BadRequestError("The id is invalid"));
        }
       
        const [admin , manager , customer] = await Promise.all([
            adminServices.getOne(id) , 
            managerServices.getOne(id) , 
            customerServices.getOne(id)
        ])
        if (!(admin || manager || customer)) {
            return next(new ForbiddenError("Forbidden : You cannot visit"));
        }else {
            next();
        }
    } catch (error: any) {
        return next(new ApplicationError(error.message));
    }
};

export default isCustomerOrManager;
