import {Request , Response ,  NextFunction } from "express";
import adminServices from "../features/administrator/admin.services";
import isValidId from "../lib/is-valid-id";

const isAdminRequest = async (
    req  : Request , 
    res : Response , 
    next : NextFunction
) =>{
    try{
        const id = res.locals.id 
        if (id === undefined || !isValidId(id)){
            return res.status(400).json({
                message : "BadRequest"
            })
        }
        const admin = await adminServices.getOne(id)
        if(!admin){
            return res.status(403).json({
                message : "Forbidden : You cannot visit",
                body : {}
            })
        }else{
            next()
        }
    }catch(error:any){
        console.log(error)
        res.status(500).json({
            message : error.message , 
            body : {}
        })
    }
}

export default isAdminRequest