import * as dotenv from "dotenv" 
dotenv.config() 

let environment : string = process.env.NODE_ENV === "production" ? 
    "production" : "dev"

interface IConfig {
    serverPort: string 
    mongoUrl : string
    adminEmail : string 
    adminPassword  :string,
    saltFactor : number
}

const Config: IConfig = {
    serverPort : process.env.SERVER_PORT as string , 
    mongoUrl : environment === "dev" ? 
        process.env.LOCAL_MONGO_URL as string : 
        process.env.LOCAL_REMOTE_URL as string , 
    adminEmail : process.env.ADMIN_EMAIL as string ,
    adminPassword : process.env.ADMIN_PASSWORD as string,
    saltFactor : Number(process.env.SALT_FACTOR)
}

export default Config