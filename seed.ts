import { connect, connection } from "mongoose";
import Config from "./src/config";
import mongooseOptions from "./src/loaders/mongoose-options";
import adminServices from "./src/features/administrator/admin.services";

console.log(Config.mongoUrl) ;

(async () => {
    const db = await connect(Config.mongoUrl, mongooseOptions);
    try {
        if (db) {
            const isAdmin = await adminServices.getByEmail(Config.adminEmail);
            if (isAdmin) {
                console.log(
                    `An admin already exist with this email ${Config.adminEmail}`
                );
                return;
            } else {
                await adminServices.add({
                    email: Config.adminEmail,
                    password: Config.adminPassword
                });
                console.log(`Admin creation was successful`);
            }
        }
    } catch (error) {
        console.log(error);
    } finally {
        connection.close(() => {
            console.log("connection closed");
        });
        process.exit(0);
    }
})();
