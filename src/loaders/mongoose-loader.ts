import { connect, connection } from "mongoose";
import Config from "../config";
import mongooseOptions from "./mongoose-options";

const startMongoDB = async () => {
    try {
        await connect(Config.mongoUrl, mongooseOptions)
            .then(() => console.log("Connected to the database"))
            .catch((error) => console.log(error));

        process.on("SIGINT", () => {
            connection.close(() => {
                console.log("Mongoose terminated. Process ended");
            });
            process.exit(0);
        });
        return;
    } catch (error) {
        console.log(error);
    }
};

export default startMongoDB;
