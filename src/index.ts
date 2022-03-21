import express , {Request , Response} from "express" 
import helmet from "helmet"
import cors from "cors"
import compression from "compression" 


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

app.listen(4800 , () => console.log("Started at localhost:4800"))

