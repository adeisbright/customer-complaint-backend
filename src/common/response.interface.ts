
import IObjects from "./props.interface" 

type StringNum = string  | number | IObjects[]
interface IResponse {
    id: string;
    message: string;
    body?: {
        data : Record<string , never> //StringNum 
    };
}

export default IResponse;
