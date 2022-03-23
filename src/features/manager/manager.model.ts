import { Schema , model } from "mongoose";
import IManager from "./manager.interface";
import * as bcrypt from "bcryptjs"
import Config from "../../config";

const managerSchema = new Schema<IManager>({
    firstName : String , 
    lastName : String , 
    email :String,
    phoneNumber : String , 
    password : String , 
    branch : {
        ref : "branches" , 
        type : Schema.Types.ObjectId
    }
})


managerSchema.pre("save" , async function(next){
    if(!this.isModified("password")){
        return next()
    }
    try{
        const salt = await bcrypt.genSalt(Config.saltFactor)
        this.password = await bcrypt.hash(this.password , salt)
        return next()
    }catch(error : any){
        return next(error)
    }
}) 

managerSchema.post("save" , async function(next){
    delete this.password 
    return 
}) 

managerSchema.methods.isCorrectPassword = async function(text : string) : Promise<boolean>{
    return await bcrypt.compare(text , this.password)
}

managerSchema.pre("find" , {query : true} , 
async function(next){
    this.select({password : 0})
    return next()
})


const ManagerModel = model<IManager>("managers" , managerSchema) 
export default ManagerModel