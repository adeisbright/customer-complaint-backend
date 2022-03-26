import { Router } from "express";
import managerController from "./manager.controller";
import isAdminRequest from "../../middleware/is-request-from-admin";
import authenticateRequst from "../../middleware/auth";
import validateManagerData from "../../middleware/validate-create-manager-data";

const { addManager, getManager, getManagers, removeManager, updateManager } =
    managerController;

const managerRouter = Router();

managerRouter
    .route("/v1/managers")
    .get(getManagers)
    .post(validateManagerData, authenticateRequst, isAdminRequest, addManager);

managerRouter
    .route("/v1/managers/:id")
    .get(getManager)
    .delete(authenticateRequst, isAdminRequest, removeManager)
    .patch(authenticateRequst, isAdminRequest, updateManager);

export default managerRouter;
