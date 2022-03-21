import {connect , connection} from "mongoose"
import Config from "../config"

const startMongoDB = async () => {
    try {
        const options = {
            useNewUrlParser: true,
            autoIndex: false,
            keepAlive: true,
            useUnifiedTopology: true,
            keepAliveInitialDelay: 5e6,
            serverSelectionTimeoutMS: 10e3,
            socketTimeoutMS: 5000,
        }

        await connect(Config.mongoUrl ,options)
            .then(() => console.log("Connected to the database"))
            .catch((error) => console.log(error))
       
        process.on("SIGINT", () => {
            connection.close(() => {
                console.log("Mongoose terminated. Process ended");
            });
            process.exit(0);
        });
        return 
    }catch(error){
        console.log(error)
    }
}

export default startMongoDB