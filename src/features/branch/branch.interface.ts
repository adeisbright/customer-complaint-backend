export interface IBranchAddress {
    country?: string;
    state: string;
    city: string;
    address: string;
}

interface IManagers {
    _id: string;
    from: Date;
    to: Date;
    comment: string;
}

interface IBranch {
    name: string;
    email: string;
    phoneNumber: string;
    address: IBranchAddress;
    managers?: IManagers[];
    customers?: string[];
    currentManager?: string;
}

export interface IBranchUpdate {
    name?: string;
    email?: string;
    phoneNumber?: string;
    address?: IBranchAddress;
    managers?: IManagers[];
    customers?: string[];
    currentManager?: string;
}

export default IBranch;
