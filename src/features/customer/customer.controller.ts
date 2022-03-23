
import {Request , Response , NextFunction} from "express" 
import customerServices from "./customer.services";
import getQueryParser from "../../lib/get-query-parser"
import branchServices from "../branch/branch.services";
import IObjectProps from "../../common/props.interface";


class CustomerController {
    async addCustomer(
        req : Request , 
        res : Response , 
        next : NextFunction
    ){
        try{
            const {
                firstName , 
                lastName , 
                email , 
                branch , 
                address , 
                phoneNumber
            } = req.body 

            const isValidBranch = await branchServices.getOne(branch)
            if(!isValidBranch){
                return res.status(404).json({
                    message : "A non-existent branch as provided"
                })
            }
            let data : IObjectProps = await customerServices.add({
                firstName , 
                lastName , 
                email , 
                phoneNumber , 
                branch  , 
                address , 
                password : phoneNumber
            })

            let clone = Object.create({}) 
            

            if (data !== null){
                Object.assign(clone , data._doc) 
                delete clone.password
                delete clone.__v
            
            }
           
            res.status(201).json({
                message : "Customer Added Successfully" , 
                body : {
                    data : clone
                }
            })
        }catch(error : any){
            console.log(error)
            res.status(500).json({
                message  :error.message
            })
        }
    }

    async getCustomer(
        req : Request , 
        res : Response , 
        next : NextFunction
    ){
        try{
            const {id} = req.params 
            const data = await customerServices.getOne(id)
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

    async getCustomers(
        req : Request , 
        res : Response , 
        next : NextFunction
    ){
        try{
            const {size , skip , filters } = getQueryParser(req.query)
            const data = await customerServices.getAll(
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

    async removeCustomer(
        req : Request , 
        res : Response , 
        next : NextFunction
    ){
        try{
            const {id} = req.params 
            const isExist = await customerServices.getOne(id)
            if (!isExist){
                return res.status(404).json({
                    message : "Resource not found" ,
                    body : {}
                })
            }
            await customerServices.delete(id)
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

    async updateCustomer(
        req : Request , 
        res : Response , 
        next : NextFunction
    ){
        try{
            const {id} = req.params 
            const isExist = await customerServices.getOne(id)
            if (!isExist){
                return res.status(404).json({
                    message : "Resource not found" ,
                    body : {}
                })
            }
            let data = await customerServices.update(id , req.body) 
            
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

export default new CustomerController()