import {Schema , model} from "mongoose" 
import IBranch from "./branch.interface"
import ManagerModel from "../manager/manager.model"

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


branchSchema.pre("deleteOne" ,{ document: true}, 
    async function(next){
        await ManagerModel.deleteMany({ branch: this._id });
        next()
})

const BranchModel = model<IBranch>("branches" , branchSchema)                  
export default BranchModel