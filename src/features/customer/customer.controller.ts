import { Request, Response, NextFunction } from "express";
import customerServices from "./customer.services";
import getQueryParser from "../../lib/get-query-parser";
import branchServices from "../branch/branch.services";
import IObjectProps from "../../common/props.interface";
import ApplicationError from "../../common/error-handler/ApplicationError";
import NotFoundError from "../../common/error-handler/NotFoundError";
import BadRequestError from "../../common/error-handler/BadRequestError";
import checkIfDuplicate from "../../common/reject-duplicate";
import fieldRemoval from "../../lib/remove-field";
import constants from "../../constant";


const {
    statusCode : {
        OK,
        CREATED
    }
} = constants ;

class CustomerController {
    async addCustomer(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                firstName,
                lastName,
                email,
                branch,
                address,
                city,
                state , 
                phoneNumber,
                avatarUrl
            } = req.body;

            const isValidBranch = await branchServices.getOne(branch);
            if (!isValidBranch) {
                return next(
                    new BadRequestError("A non-existent branch as provided")
                );
            }

            const options = [{ email: email }, { phoneNumber: phoneNumber }];

            if (!(await checkIfDuplicate(customerServices, {}, options))) {
                return next(
                    new BadRequestError("A Customer with same details exist")
                );
            }

            const result: IObjectProps = await customerServices.add({
                firstName,
                lastName,
                email,
                phoneNumber,
                branch,
                address,
                city , 
                state,
                avatarUrl,
                password: phoneNumber
            });
            const data = fieldRemoval(result._doc, ["password", "__v"]).clone;
            res.status(CREATED).json({
                message: "Customer Added Successfully",
                statusCode : CREATED,
                body: {
                    data
                }
            });
        } catch (error: any) {
            return next(new ApplicationError(error.message));
        }
    }

    async getCustomer(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const query = await customerServices.getOne(id);
            if (!query) {
                return next(new NotFoundError("Resource not found"));
            }

            const data = fieldRemoval(query, ["password", "__v"]).clone;
            res.status(OK).json({
                message: "Customer Retrieval",
                statusCode : OK,
                body: {
                    data
                }
            });
        } catch (error: any) {
            return next(new ApplicationError(error.message));
        }
    }

    async getCustomers(req: Request, res: Response, next: NextFunction) {
        try {
            const { size, skip, filters } = getQueryParser(req.query);
            const data = await customerServices.getAll(
                Number(size),
                Number(skip),
                filters
            );
            res.status(OK).json({
                message: "Customer Retrieval",
                statusCode : OK , 
                body: {
                    data
                }
            });
        } catch (error: any) {
            return next(new ApplicationError(error.message));
        }
    }

    async removeCustomer(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const isExist = await customerServices.getOne(id);
            if (!isExist) {
                return next(new NotFoundError("Resource not found"));
            }
            await customerServices.delete(id);
            res.status(OK).json({
                statusCode : OK,
                message: "Customer Removed Successfully",
                body: {}
            });
        } catch (error: any) {
            return next(new ApplicationError(error.message));
        }
    }

    async updateCustomer(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const isExist = await customerServices.getOne(id);
            if (!isExist) {
                return next(new NotFoundError("Resource not found"));
            }
            const data = await customerServices.update(id, req.body);

            res.status(constants.statusCode.OK).json({
                message: "Customer Updated Successfully",
                statusCode : constants.statusCode.OK,
                body: {
                    data
                }
            });
        } catch (error: any) {
            return next(new ApplicationError(error.message));
        }
    }
}

export default new CustomerController();
