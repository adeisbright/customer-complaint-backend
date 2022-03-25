import express , {NextFunction, Request , Response } from "express" 
import path from "path"
import helmet from "helmet"
import cors from "cors"
import compression from "compression" 
import Config from "./config"
import startMongoDB from "./loaders/mongoose-loader"  
import adminRouter from "./features/administrator/admin.routes"
import branchRouter from "./features/branch/branch.routes"
import managerRouter from "./features/manager/manager.routes"
import customerRouter from "./features/customer/customer.routes"
import complaintRouter from "./features/complaint/complaint.routes"
import middleware from "./middleware"
import httpLogger from "./common/logging/http-logger"

const app:express.Application = express() 

app.use(compression())
app.use(express.json())
app.use(helmet()) 
app.use(httpLogger)
app.use(cors()) 
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../storage")));


app.get("/" , (req : Request , res : Response) => {
    res.status(200).json({
        message : "Ok" , 
        body : {
            data : []
        }
    })
})

startMongoDB() 

app.use(adminRouter)
app.use(branchRouter)
app.use(managerRouter)
app.use(customerRouter)
app.use(complaintRouter)
app.use(middleware.errorHandler)

app.listen(Config.serverPort , () => 
    console.log(`Started at localhost:${Config.serverPort}`)
)

