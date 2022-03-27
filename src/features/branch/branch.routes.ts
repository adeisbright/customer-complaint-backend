import { Router } from "express";
import branchController from "./branch.controller";
import isAdminRequest from "../../middleware/is-request-from-admin";
import authenticateRequest from "../../middleware/auth";
import validateBranchField from "../../middleware/validate-branch-creation";
import validateDocumentId from "../../middleware/verify-id";

const { addBranch, getBranch, getBranches, removeBranch, updateBranch } =
    branchController;
const branchRouter = Router();

branchRouter
    .route("/v1/branches")
    .get(getBranches)
    .post(validateBranchField, authenticateRequest, isAdminRequest, addBranch);

branchRouter
    .route("/v1/branches/:id")
    .get(getBranch)
    .delete(validateDocumentId , authenticateRequest, isAdminRequest, removeBranch)
    .patch(validateDocumentId , authenticateRequest, isAdminRequest, updateBranch);

export default branchRouter;
