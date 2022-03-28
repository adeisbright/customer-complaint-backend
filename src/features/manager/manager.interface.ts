import { Schema } from "mongoose";
interface IManager {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password?: string;
    branch: Schema.Types.ObjectId;
}

export interface IManagerPatch {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    branch?: string;
}

export default IManager;
