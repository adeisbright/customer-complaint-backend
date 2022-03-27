import { Response } from "express";
import IObjectProps from "../common/props.interface";

export interface IBody {
    statusCode: number;
    message: string;
    body: {
        data: string | number | IObjectProps[] | IObjectProps;
    };
}

const response = (res: Response, body: IBody) => {
    return res.status(body.statusCode).json(body);
};

export default response;
