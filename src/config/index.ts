process.env.NODE_ENV = "test" ; 
import * as dotenv from "dotenv";
dotenv.config();



const environment: string =
    process.env.NODE_ENV === "production" ? "production" : 
    process.env.NODE_ENV === "dev"  ? "dev" : "test";

interface IJWT {
    secret: string;
    issuer: string;
    expires: number;
    subject: string;
    algorithm: string;
}
interface IConfig {
    serverPort: string;
    mongoUrl: string; 
    adminEmail: string;
    adminPassword: string;
    saltFactor: number;
    JWT: IJWT;
    maxBranches: number;
}



const Config: IConfig = {
    serverPort: process.env.SERVER_PORT as string,
    mongoUrl:
        environment === "dev"
            ? (process.env.LOCAL_MONGO_URL as string)
            : (environment === "test" ? 
            process.env.LOCAL_MONGO_URL_TEST as string : 
            process.env.REMOTE_MONGO_URL as string),
    adminEmail: process.env.ADMIN_EMAIL as string,
    adminPassword: process.env.ADMIN_PASSWORD as string,
    saltFactor: Number(process.env.SALT_FACTOR),
    JWT: {
        secret: process.env.JWT_SECRET as string,
        issuer: process.env.JWT_ISSUER as string,
        subject: process.env.JWT_SUBJECT as string,
        algorithm: process.env.JWT_ALGORITHM as string,
        expires: Number(process.env.JWT_EXPIRES)
    },
    maxBranches: Number(process.env.MAX_BRANCHES)
};

export default Config;
