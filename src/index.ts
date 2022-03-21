import express , {Request , Response} from "express" 
import helmet from "helmet"
import cors from "cors"
import compression from "compression" 
import Config from "./config"
import startMongoDB from "./loaders/mongoose-loader" 


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

app.listen(Config.serverPort , () => 
    console.log(`Started at localhost:${Config.serverPort}`)
)

