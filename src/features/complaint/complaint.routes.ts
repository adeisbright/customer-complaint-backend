import { Router } from "express";
import complaintController from "./complaint.controller";
import isAdminRequest from "../../middleware/is-request-from-admin";
import isCustomerRequest from "../../middleware/is-request-from-customer";
import isManager from "../../middleware/is-manager";
import authenticateRequest from "../../middleware/auth";
import isCustomerOrManager from "../../middleware/is-admin-or-customer";
import validateComplaint from "../../middleware/validate-complaint";
import validateDocumentId from "../../middleware/verify-id";

const {
    addComplaint,
    getComplaint,
    getComplaints,
    removeComplaint,
    updateComplaint
} = complaintController;

const complaintRouter = Router();

complaintRouter
    .route("/v1/complaints")

    .get(getComplaints)
    .post(validateComplaint, authenticateRequest, isCustomerRequest, addComplaint);

complaintRouter
    .all("/v1/complaints/:id" , validateDocumentId)
    .route("/v1/complaints/:id")
    .get(getComplaint)
    .delete(authenticateRequest, isCustomerOrManager, removeComplaint)
    .patch(authenticateRequest, isManager, updateComplaint); 

export default complaintRouter;
