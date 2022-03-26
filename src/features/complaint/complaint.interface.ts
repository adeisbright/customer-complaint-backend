import { Schema } from "mongoose";

enum StatusEnum {
    P = "Pending",
    A = "Answered",
    C = "Consideration"
}

interface IComment {
    message: string;
    sender: Schema.Types.ObjectId;
    userType: string;
}

interface IComplaint {
    title: string;
    message: string;
    reviewed?: boolean;
    branch: Schema.Types.ObjectId;
    customer: Schema.Types.ObjectId;
    status?: StatusEnum;
    resolvedBy?: Schema.Types.ObjectId;
    comments?: IComment[];
}

export interface IComplaintPatch {
    status: StatusEnum;
    resolvedBy: Schema.Types.ObjectId;
}

export default IComplaint;
