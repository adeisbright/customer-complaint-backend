import { Router } from "express" ; 
import complaintController from "./complaint.controller";
import isAdminRequest from "../../middleware/is-request-from-admin";
import authenticateRequst from "../../middleware/auth"; 

const {
  addComplaint , 
  getComplaint , 
  getComplaints , 
  removeComplaint , 
  updateComplaint
} = complaintController

const complaintRouter = Router() 

complaintRouter.route("/v1/complaints")

.get(getComplaints)
.post(authenticateRequst,isAdminRequest, addComplaint)


complaintRouter.route("/v1/complaints/:id")
.get(getComplaint)
.delete(authenticateRequst,isAdminRequest , removeComplaint)
.patch(authenticateRequst,isAdminRequest , updateComplaint)



export default complaintRouter