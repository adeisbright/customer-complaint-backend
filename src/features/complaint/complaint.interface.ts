enum StatusEnum {
    P = "Pending",
    A = "Answered",
    C = "Consideration"
}

interface IComment {
    message: string;
    sender:string;
    userType: string;
}

interface IComplaint {
    title: string;
    message: string;
    reviewed?: boolean;
    branch?: string;
    customer?: string ;
    status?: StatusEnum;
    resolvedBy?: string;
    comments?: IComment[];
}

export interface IComplaintPatch {
    status: StatusEnum;
    resolvedBy: string;
}

export default IComplaint;
