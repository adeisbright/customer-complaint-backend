import { Router } from "express";
import branchController from "./branch.controller";
import isAdminRequest from "../../middleware/is-request-from-admin";
import authenticateRequst from "../../middleware/auth"; 
import validateBranchField from "../../middleware/validate-branch-creation";

const {
    addBranch,
    getBranch , 
    getBranches,
    removeBranch,
    updateBranch
} = branchController
const branchRouter = Router() 

branchRouter.route("/v1/branches")
.get(getBranches)
.post(validateBranchField , authenticateRequst,isAdminRequest, addBranch)


branchRouter.route("/v1/branches/:id")
.get(getBranch)
.delete(authenticateRequst,isAdminRequest , removeBranch)
.patch(authenticateRequst,isAdminRequest , updateBranch)



export default branchRouter