import { Router } from "express";
import customerController from "./customer.controller";
import isAdminRequest from "../../middleware/is-request-from-admin";
import authenticateRequst from "../../middleware/auth"; 
import validateManagerData from "../../middleware/validate-create-manager-data";

const {
   addCustomer , 
   getCustomer , 
   getCustomers , 
   removeCustomer,
   updateCustomer
} = customerController

const customerRouter = Router() 

customerRouter.route("/v1/customers")
.get(getCustomers)
.post(validateManagerData ,  authenticateRequst,isAdminRequest, addCustomer)


customerRouter.route("/v1/customers/:id")
.get(getCustomer)
.delete(authenticateRequst,isAdminRequest , removeCustomer)
.patch(authenticateRequst,isAdminRequest , updateCustomer)



export default customerRouter