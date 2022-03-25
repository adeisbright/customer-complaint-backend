
import FileMover from "../lib/FileMover";
import {Request , Response ,  NextFunction } from "express";
import DiskStorageHelper  from "../lib/disk-storage-helper"; 
import BadRequestError from "../common/error-handler/BadRequestError"; 
import ApplicationError from "../common/error-handler/ApplicationError";

const fileService = new FileMover(DiskStorageHelper) 

class MoveFile {
    static async diskMove(req : Request, res : Response, next : NextFunction) {
        try { 
            if (req.file) {
                const avatarName = req.file.originalname;
                const uploadPath = "../storage/app/temp/";
                const todosAvatarPath = "../storage/app/public/";
                let getFilePath = await fileService.uploadToDisk(
                    avatarName,
                    uploadPath,
                    todosAvatarPath
                );
                req.body.avatarUrl = getFilePath;
                next();
            } else {
                return next(new BadRequestError("Please,kindly attach a file" ))
            }
        } catch (error : any) {
            return next(new ApplicationError(error.message))
        }
    }

    
}

export default MoveFile