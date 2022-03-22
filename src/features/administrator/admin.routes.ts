import { Router } from "express";
import authenticateRequst from "../../middleware/auth";
import AdminController from "./admin.controller"
import Login from "../../common/common.login";
import adminServices from "./admin.services";


const {getAdmin} = AdminController
const login = new Login(adminServices)

const adminRouter = Router()

adminRouter.post("/auth/admin" , login.grantAccess) 
adminRouter.get("/v1/admin" , authenticateRequst , getAdmin )
export default adminRouter 
