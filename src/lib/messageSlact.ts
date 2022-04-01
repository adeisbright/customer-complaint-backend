import Config from "../config"; 
import fileLogger from "../common/logging/file-logger";
import {WebClient} from "@slack/web-api"

const slackClient = new WebClient(Config.slackBotToken) 
    
const getChannel = async (name:string) => {
    const channels = await slackClient.conversations.list() ;
    let channel ; 
    if (channels.channels !== undefined && channels.channels.length > 0){
        channel = channels.channels.find(val => val.name === name)
    }
    return channel
}

const messageSlack = async (text  :string , channelName : string) => {
    try{
        let channel = await getChannel(channelName) 
        
        if (channel !== null || channel !== undefined){
            return await slackClient.chat.postMessage({
                channel : channel!.id as string, 
                text :  text , 
                token : Config.slackBotToken
            })
        }

        return 
    }catch(error : any){
        fileLogger.log({
            message : error.message , 
            level  :"error"
        })
    }
}


export default messageSlack
