import Config from "../config"; 
import axios from "axios"; 
import fileLogger from "../common/logging/file-logger";

const messageTelegram = async (message:string) => { 
    try { 
        await axios({
           url : `https://api.telegram.org/bot${Config.telegramBotToken}/sendMessage?chat_id=${Config.telegramGroupID}&text=${message}`,
           headers : {
               "content-type" : "application/json"
           } , 
           method : "POST" , 
           data:{
               message : message
           }
       })
    }catch(error : any){
        fileLogger.log({
            message: error.message,
            level: "error"
        });
    }
}

export default messageTelegram