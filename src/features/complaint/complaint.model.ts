import IComplaint from "./complaint.interface"; 
import {model, Schema}  from "mongoose" 

const complaintSchema = new Schema<IComplaint>({
    title : String , 
    message : String , 
    customer : {
        type : Schema.Types.ObjectId , 
        ref : "customers"
    } , 
    branch : {
        type : Schema.Types.ObjectId , 
        ref : "branches"
    } , 
    status : {
        type : String , 
        enum : ["P" ,"C"  ,  "A"] , 
        default  : "P"
    } , 
    reviewed : {
        type : Boolean, 
        default : false
    } , 
    resolvedBy : {
        type : Schema.Types.ObjectId , 
        ref : "managers"
    } , 
    comments : [
        {
            message : String,
            userType : String , 
            sender : Schema.Types.ObjectId
        }
    ]
} , {
    timestamps : true
})



const ComplaintModel = model<IComplaint>("complaints" , complaintSchema)
export default ComplaintModel