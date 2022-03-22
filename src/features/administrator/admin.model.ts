import {Schema , model} from "mongoose" 
import * as bcrypt from "bcryptjs"
import IAdmin from "./admin.interface"
import Config from "../../config"

const adminSchema = new Schema<IAdmin>({
    email: String , 
    password : String , 
    userName: String , 
    roles : []
} , {
    timestamps : true
})

adminSchema.pre("save" , async function(next){
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

adminSchema.methods.isCorrectPassword = async function(text : string) : Promise<boolean>{
    return await bcrypt.compare(text , this.password)
}

const AdminModel = model<IAdmin>("administrators" , adminSchema)

export default AdminModel