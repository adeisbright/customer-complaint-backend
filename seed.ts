import {connect , connection , Schema , model} from "mongoose" ; 
import * as bcrypt from "bcryptjs"
import Config from "./src/config";
import mongooseOptions from "./src/loaders/mongoose-options"



(async () => {
    
    let db = await connect(Config.mongoUrl, mongooseOptions)
    try {
        if (db){
            interface IAdmin {
                email : string ,
                password : string
            }
            
            const adminSchema = new Schema<IAdmin>({
                email : String , 
                password : String
            })

            const Admin = model<IAdmin>("admin" , adminSchema)
            
            const isAdmin = await Admin.findOne({email : Config.adminEmail})
            if (isAdmin){
                console.log(`An admin already exist with this email ${Config.adminEmail}`)
                return 
            }else {
                await Admin.create({
                    email : Config.adminEmail, 
                    password : await bcrypt.hash(Config.adminPassword , 10)
                })
                console.log(`Admin creation was successful`)
            }
        }
    }catch(error){
        console.log(error)
    }finally{
        connection.close(() => {
            console.log("connection closed")
        })
        process.exit(0)
    }
})() 