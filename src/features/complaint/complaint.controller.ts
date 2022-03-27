import { Request, Response, NextFunction } from "express";
import complaintServices from "./complaint.services";
import getQueryParser from "../../lib/get-query-parser";
import branchServices from "../branch/branch.services";
import IObjectProps from "../../common/props.interface";
import IComplaint from "./complaint.interface"
import customerServices from "../customer/customer.services";
import BadRequestError from "../../common/error-handler/BadRequestError";
import ApplicationError from "../../common/error-handler/ApplicationError";
import NotFoundError from "../../common/error-handler/NotFoundError";
import constants from "../../constant";

const {
    statusCode : {
        OK,
        CREATED
    }
} = constants ;

class ComplaintController {
    async addComplaint(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, message} = req.body;
            const isCustomer = await customerServices.getOne(res.locals.id)
            
            if (!isCustomer) {
                return next(new NotFoundError("customer not found"));
            }
           
            const data = await complaintServices.add({
                branch : String(isCustomer.branch),
                customer : String(isCustomer._id),
                title,
                message 
            });

            res.status(CREATED).json({
                message: "Complaint Added Successfully",
                statusCode  : CREATED , 
                body: {
                    data: data
                }
            });
        } catch (error: any) {
            return next(new ApplicationError(error.message));
        }
    }

    async getComplaint(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await complaintServices.getOne(id);
            if (!data) {
                return next(new NotFoundError("Resource not found"));
            }
            res.status(OK).json({
                message: "Complaint  Retrieval", 
                statusCode : OK,
                body: {
                    data
                }
            });
        } catch (error: any) {
            return next(new ApplicationError(error.message));
        }
    }

    async getComplaints(req: Request, res: Response, next: NextFunction) {
        try {
            const { size, skip, filters } = getQueryParser(req.query);
            const data = await complaintServices.getAll(
                Number(size),
                Number(skip),
                filters
            );
            res.status(OK).json({
                message: "Complaint Retrieval",
                statusCode : OK , 
                body: {
                    data
                }
            });
        } catch (error: any) {
            return next(new ApplicationError(error.message));
        }
    }

    async removeComplaint(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const isExist = await complaintServices.getOne(id);
            if (!isExist) {
                return next(new NotFoundError("Resource not found"));
            }
            await complaintServices.delete(id);
            res.status(OK).json({
                statusCode : OK,
                message: "Complaint Removed Successfully",
                body: {}
            });
        } catch (error: any) {
            return next(new ApplicationError(error.message));
        }
    }

    async updateComplaint(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const isExist = await complaintServices.getOne(id);
            if (!isExist) {
                return next(new NotFoundError("Resource not found"));
            }
            const data = await complaintServices.update(id, req.body);

            res.status(OK).json({
                message: "Customer Updated Successfully",
                statusCode : OK , 
                body: {
                    data
                }
            });
        } catch (error: any) {
            return next(new ApplicationError(error.message));
        }
    }
}

export default new ComplaintController();
