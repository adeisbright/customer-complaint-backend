
import {Request , Response , NextFunction} from "express" 
import complaintServices from "./complaint.services";
import getQueryParser from "../../lib/get-query-parser"
import branchServices from "../branch/branch.services";
import IObjectProps from "../../common/props.interface";
import customerServices from "../customer/customer.services";
import BadRequestError from "../../common/error-handler/BadRequestError"; 
import ApplicationError from "../../common/error-handler/ApplicationError"; 
import NotFoundError from "../../common/error-handler/NotFoundError";


class ComplaintController {
    async addComplaint(
        req : Request , 
        res : Response , 
        next : NextFunction
    ){
        try{
            const {
                title , 
                message , 
                customer , 
                branch 
            } = req.body 
            const [isBranch , isCustomer] = await Promise.all([
                branchServices.getOne(branch) , 
                customerServices.getOne(customer)
            ])

            if(!isBranch || !isCustomer){
                return next(new BadRequestError("Branch/customer not found"));
            }
            let data : IObjectProps = await complaintServices.add({
                title , 
                message, 
                customer , 
                branch 
            })

           
            res.status(201).json({
                message : "Complaint Added Successfully" , 
                body : {
                    data : data
                }
            })
        }catch(error : any){
            return next(new ApplicationError(error.message))
        }
    }

    async getComplaint(
        req : Request , 
        res : Response , 
        next : NextFunction
    ){
        try{
            const {id} = req.params 
            const data = await complaintServices.getOne(id)
            if (!data){
                return res.status(404).json({
                    message : "Resource not found" ,
                    body : {}
                })
            }
            res.status(200).json({
                message : "Complaint  Retrieval" , 
                body : {
                    data 
                }
            })
        }catch(error : any){
            console.log(error)
            res.status(500).json({
                message  :error.message
            })
        }
    }

    async getComplaints(
        req : Request , 
        res : Response , 
        next : NextFunction
    ){
        try{
            const {size , skip , filters } = getQueryParser(req.query)
            const data = await complaintServices.getAll(
                Number(size) ,Number(skip) , filters
            )
            res.status(200).json({
                message : "Complaint Retrieval" , 
                body : {
                    data 
                }
            })
        }catch(error : any){
            return next(new ApplicationError(error.message))
        }
    }

    async removeComplaint(
        req : Request , 
        res : Response , 
        next : NextFunction
    ){
        try{
            const {id} = req.params 
            const isExist = await complaintServices.getOne(id)
            if (!isExist){
                return next(new NotFoundError("Resource not found"));
            }
            await complaintServices.delete(id)
            res.status(200).json({
                message : "Complaint Removed Successfully" , 
                body : {}
            })
        }catch(error : any){
            return next(new ApplicationError(error.message))
        }
    }

    async updateComplaint(
        req : Request , 
        res : Response , 
        next : NextFunction
    ){
        try{
            const {id} = req.params 
            const isExist = await complaintServices.getOne(id)
            if (!isExist){
                return next(new NotFoundError("Resource not found"));
            }
            let data = await complaintServices.update(id , req.body) 
            
            res.status(200).json({
                message : "Customer Updated Successfully" , 
                body : {
                    data
                }
            })
        }catch(error : any){
            return next(new ApplicationError(error.message))
        }
    }

}

export default new ComplaintController()