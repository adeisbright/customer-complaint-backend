import {Schema , model} from "mongoose" 
import IBranch from "./branch.interface"

const branchSchema = new Schema<IBranch>({
    name : String , 
    email : String , 
    phoneNumber : String , 
    address : {
        country : String , 
        state : String , 
        city : String , 
        address : String
    } , 
    managers : [{
        _id : String , 
        from : Date , 
        to : Date , 
        comment : String
    }] , 
    currentManager : String
} , {
    timestamps : true
})

const BranchModel = model<IBranch>("branches" , branchSchema) 
export default BranchModel