import { Router } from "express";
import customerController from "./customer.controller";
import isAdminRequest from "../../middleware/is-request-from-admin";
import authenticateRequest from "../../middleware/auth";
import validateManagerData from "../../middleware/validate-create-manager-data";
import multerMemory, { diskStorage } from "../../middleware/UploadFile";
import MoveFile from "../../middleware/move-file";
import Login from "../../common/common.login";
import customerServices from "./customer.services";

const login = new Login(customerServices);

const {
    addCustomer,
    getCustomer,
    getCustomers,
    removeCustomer,
    updateCustomer
} = customerController;

const customerRouter = Router();

customerRouter.post("/auth/customer", login.grantAccess);
customerRouter
    .route("/v1/customers")
    .get(getCustomers)
    .post(
        diskStorage.single("attachment"), 
        validateManagerData,
        authenticateRequest,
        isAdminRequest,
        MoveFile.diskMove,
        addCustomer
    );

customerRouter
    .route("/v1/customers/:id")
    .get(getCustomer)
    .delete(authenticateRequest, isAdminRequest, removeCustomer)
    .patch(authenticateRequest, isAdminRequest, updateCustomer);

export default customerRouter;
