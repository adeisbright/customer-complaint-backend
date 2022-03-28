import { Schema } from "mongoose";

interface ICustomer {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    branch: Schema.Types.ObjectId;
    address: string;
    city : string ;
    state : string ; 
    complaintSize?: number;
    avatarUrl?: string;
    password: string;
    //complaints ?: IComplaint[]
}

export interface ICustomerPatch {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    branch?: Schema.Types.ObjectId;
    address?: string;
    complaintSize?: number;
    avatarUrl?: string;
    city ?: string , 
    state ?: string
}

export default ICustomer;
