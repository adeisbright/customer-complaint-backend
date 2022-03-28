import { Router } from "express";
import managerController from "./manager.controller";
import isAdminRequest from "../../middleware/is-request-from-admin";
import authenticateRequest from "../../middleware/auth";
import validateManagerData from "../../middleware/validate-create-manager-data";
import validateDocumentId from "../../middleware/verify-id";

const { addManager, getManager, getManagers, removeManager, updateManager } =
    managerController;

const managerRouter = Router();

managerRouter
    .route("/v1/managers")
    .get(getManagers)
    .post(validateManagerData, authenticateRequest, isAdminRequest, addManager);

managerRouter
    .all("/v1/managers/:id" , validateDocumentId)
    .route("/v1/managers/:id")
    .get(getManager)
    .delete(authenticateRequest, isAdminRequest, removeManager)
    .patch(authenticateRequest, isAdminRequest, updateManager);

export default managerRouter;
