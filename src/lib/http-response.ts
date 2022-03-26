import { Response } from "express";
import IObjectProps from "../common/props.interface";

export interface IBody {
    statusCode: number;
    message: string;
    body: {
        data: string | number | IObjectProps[] | IObjectProps;
    };
}

const response = (res: Response, status: number, body: IBody) => {
    return res.status(status).json(body);
};

export default response;
