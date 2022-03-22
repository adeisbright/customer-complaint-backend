import express , {Request , Response} from "express" 
import helmet from "helmet"
import cors from "cors"
import compression from "compression" 
import Config from "./config"
import startMongoDB from "./loaders/mongoose-loader" 
import adminRouter from "./features/administrator/admin.routes"
import branchRouter from "./features/branch/branch.routes"


const app:express.Application = express() 

app.use(compression())
app.use(express.json())
app.use(helmet()) 
app.use(cors()) 

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

app.listen(Config.serverPort , () => 
    console.log(`Started at localhost:${Config.serverPort}`)
)

