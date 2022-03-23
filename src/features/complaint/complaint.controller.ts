
import {Request , Response , NextFunction} from "express" 
import complaintServices from "./complaint.services";
import getQueryParser from "../../lib/get-query-parser"
import branchServices from "../branch/branch.services";
import IObjectProps from "../../common/props.interface";
import customerServices from "../customer/customer.services";


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
                return res.status(404).json({
                    message : "A non-existent branch/customer was provided"
                })
            }
            let data : IObjectProps = await complaintServices.add({
                title , 
                message, 
                customer , 
                branch 
            })

           
            res.status(201).json({
                message : "Customer Added Successfully" , 
                body : {
                    data : data
                }
            })
        }catch(error : any){
            console.log(error)
            res.status(500).json({
                message  :error.message
            })
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
                message : "Customer Retrieval" , 
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
                message : "Customer Retrieval" , 
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

    async removeComplaint(
        req : Request , 
        res : Response , 
        next : NextFunction
    ){
        try{
            const {id} = req.params 
            const isExist = await complaintServices.getOne(id)
            if (!isExist){
                return res.status(404).json({
                    message : "Resource not found" ,
                    body : {}
                })
            }
            await complaintServices.delete(id)
            res.status(200).json({
                message : "Customer Removed Successfully" , 
                body : {}
            })
        }catch(error : any){
            console.log(error)
            res.status(500).json({
                message  :error.message
            })
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
                return res.status(404).json({
                    message : "Resource not found" ,
                    body : {}
                })
            }
            let data = await complaintServices.update(id , req.body) 
            
            res.status(200).json({
                message : "Customer Updated Successfully" , 
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

}

export default new ComplaintController()