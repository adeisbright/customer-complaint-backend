import { Request, Response, NextFunction } from "express";
import managerServices from "./manager.services";
import getQueryParser from "../../lib/get-query-parser";
import branchServices from "../branch/branch.services";
import IObjectProps from "../../common/props.interface";
import ApplicationError from "../../common/error-handler/ApplicationError";
import NotFoundError from "../../common/error-handler/NotFoundError";
import BadRequestError from "../../common/error-handler/BadRequestError";
import checkIfDuplicate from "../../common/reject-duplicate";

class ManagerController {
    async addManager(req: Request, res: Response, next: NextFunction) {
        try {
            const { firstName, lastName, email, branch, phoneNumber } =
                req.body;

            const isValidBranch = await branchServices.getOne(branch);
            if (!isValidBranch) {
                return next(
                    new BadRequestError("A non-existent branch as provided")
                );
            }

            const options = [{ email: email }, { phoneNumber: phoneNumber }];

            if (!(await checkIfDuplicate(managerServices, {}, options))) {
                return next(
                    new BadRequestError("A manager  with same details exist")
                );
            }

            const data: IObjectProps = await managerServices.add({
                firstName,
                lastName,
                email,
                phoneNumber,
                branch,
                password: phoneNumber
            });

            res.status(201).json({
                message: "Manager Added Successfully",
                body: {
                    data
                }
            });
        } catch (error: any) {
            return next(new ApplicationError(error.message));
        }
    }

    async getManager(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await managerServices.getOne(id);
            if (!data) {
                return next(new NotFoundError("Resource not found"));
            }
            res.status(200).json({
                message: "Manager Retrieval",
                body: {
                    data
                }
            });
        } catch (error: any) {
            return next(new ApplicationError(error.message));
        }
    }

    async getManagers(req: Request, res: Response, next: NextFunction) {
        try {
            const { size, skip, filters } = getQueryParser(req.query);
            const data = await managerServices.getAll(
                Number(size),
                Number(skip),
                filters
            );
            res.status(200).json({
                message: "Managers Retrieval",
                body: {
                    data
                }
            });
        } catch (error: any) {
            return next(new ApplicationError(error.message));
        }
    }

    async removeManager(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const isExist = await managerServices.getOne(id);
            if (!isExist) {
                return next(new NotFoundError("Resource not found"));
            }
            await managerServices.delete(id);
            res.status(200).json({
                message: "Manager Removed Successfully",
                body: {}
            });
        } catch (error: any) {
            return next(new ApplicationError(error.message));
        }
    }

    async updateManager(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const isExist = await managerServices.getOne(id);
            if (!isExist) {
                return next(new NotFoundError("Resource not found"));
            }
            const options = [];
            for (const [key, value] of Object.entries(req.body)) {
                const obj: IObjectProps = {};
                obj[key] = value;
                options.push(obj);
            }

            if (!(await checkIfDuplicate(managerServices, isExist, options))) {
                return next(
                    new BadRequestError("A Manager with same details exist")
                );
            }
            const data = await managerServices.update(id, req.body);

            res.status(200).json({
                message: "Manager Updated Successfully",
                body: {
                    data
                }
            });
        } catch (error: any) {
            return next(new ApplicationError(error.message));
        }
    }
}

export default new ManagerController();
