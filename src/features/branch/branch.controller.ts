
import {Request , Response , NextFunction} from "express" 
import Config from "../../config"; 
import branchServices from "./branch.services";
import getQueryParser from "../../lib/get-query-parser"


class BranchController {
    async addBranch(
        req : Request , 
        res : Response , 
        next : NextFunction
    ){
        try{
            const MAX_BRANCH_COUNT = Number(Config.maxBranches)
            const branches = await branchServices.getAll(5,1) 

            if (!(branches.length <= MAX_BRANCH_COUNT - 1)){
                return res.status(400).json({
                    message : "BadRequest  :Maximum Number of Branches Created"
                })
            }
            const {
                name , 
                email , 
                address , 
                state , 
                city , 
                phoneNumber
            } = req.body 

            let data = await branchServices.add({
                name , 
                email , 
                phoneNumber , 
                address : {
                    city , 
                    state , 
                    address
                }
            })
            res.status(201).json({
                message : "Branch Added Successfully" , 
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

    async getBranch(
        req : Request , 
        res : Response , 
        next : NextFunction
    ){
        try{
            const {id} = req.params 
            const data = await branchServices.getOne(id)
            if (!data){
                return res.status(404).json({
                    message : "Resource not found" ,
                    body : {}
                })
            }
            res.status(200).json({
                message : "Branch Retrieval" , 
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

    async getBranches(
        req : Request , 
        res : Response , 
        next : NextFunction
    ){
        try{
            const {size , skip , filters } = getQueryParser(req.query)
            const data = await branchServices.getAll(
                Number(size) ,Number(skip) , filters
            )
            res.status(200).json({
                message : "Branches Retrieval" , 
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

    async removeBranch(
        req : Request , 
        res : Response , 
        next : NextFunction
    ){
        try{
            const {id} = req.params 
            const isExist = await branchServices.getOne(id)
            if (!isExist){
                return res.status(404).json({
                    message : "Resource not found" ,
                    body : {}
                })
            }
            await branchServices.delete(id)
            res.status(200).json({
                message : "Branches Removed Successfully" , 
                body : {}
            })
        }catch(error : any){
            console.log(error)
            res.status(500).json({
                message  :error.message
            })
        }
    }

    async updateBranch(
        req : Request , 
        res : Response , 
        next : NextFunction
    ){
        try{
            const {id} = req.params 
            const isExist = await branchServices.getOne(id)
            if (!isExist){
                return res.status(404).json({
                    message : "Resource not found" ,
                    body : {}
                })
            }
            let data = await branchServices.update(id , req.body) 
            res.status(200).json({
                message : "Branches Updated Successfully" , 
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

export default new BranchController()