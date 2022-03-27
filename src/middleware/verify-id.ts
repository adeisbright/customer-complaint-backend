import { Request, Response, NextFunction } from "express";
import isValidId from "../lib/is-valid-id";
import BadRequestError from "../common/error-handler/BadRequestError";

const validateDocumentId = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{ 
        if (req.params.id === undefined || !isValidId(req.params.id)) {
            return res.status(400).json({
                message: "Provide a valid branch ID"
            });
        }
        next()
    }catch(error : any){
        return next(new BadRequestError(error.message));
    }
}

export default validateDocumentId