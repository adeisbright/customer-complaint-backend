
import {Request , Response , NextFunction} from "express" 
import Config from "../../config"; 
import branchServices from "./branch.services";
import getQueryParser from "../../lib/get-query-parser"
import response from "../../lib/http-response";
import constants from "../../constant";
import ApplicationError from "../../common/error-handler/ApplicationError";
import BadRequestError from "../../common/error-handler/BadRequestError";
import NotFoundError from "../../common/error-handler/NotFoundError";


class BranchController {
    async addBranch(
        req : Request , 
        res : Response , 
        next : NextFunction
    ){
        try{
            const MAX_BRANCH_COUNT = Number(Config.maxBranches)
            const branches = await branchServices.getAll(5,1) 
            if (!(branches.length < (MAX_BRANCH_COUNT - 1))){
                return next(new BadRequestError("Maximum Number of Branches Created"))
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
            return next(new BadRequestError(error.message))
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
                return next(new NotFoundError("Resource not found"))
            }
            res.status(200).json({
                message : "Branch Retrieval" , 
                body : {
                    data 
                }
            })
        }catch(error : any){
            return next(new ApplicationError(error.message));
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
            return next(new ApplicationError(error.message));
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
                
                return next(new NotFoundError("Resource not found"));
            }
            await branchServices.delete(id)
            res.status(200).json({
                message : "Branches Removed Successfully" , 
                body : {}
            })
        }catch(error : any){
            return next(new ApplicationError(error.message));
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
                return next(new NotFoundError("Resource not found"))
            }
            let data = await branchServices.update(id , req.body) 
            res.status(200).json({
                message : "Branches Updated Successfully" , 
                body : {
                    data
                }
            })
        }catch(error : any){
            return next(new ApplicationError(error.message));
        }
    }

}

export default new BranchController()