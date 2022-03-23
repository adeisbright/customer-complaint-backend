import ManagerModel from "./manager.model"; 
import IManager , {IManagerPatch} from "./manager.interface";
import IObjectProps from "../../common/props.interface";

class ManagerDAO { 
    async create(data : IManager){
        return await ManagerModel.create(data)
    }

    async getOne(id : string){
        return await ManagerModel.findById(id)
    }

    async getAll(limit : number , page : number , filter ?: IObjectProps){
        return await ManagerModel.find({})
        .skip(page).limit(limit).select(filter)
    }

    async remove(id : string){
        return await ManagerModel.deleteOne({_id : id})
    } 

    async update(id : string , data : IManagerPatch){
        return await ManagerModel.findByIdAndUpdate(id ,data , {
            useFindAndModify : false , 
            new : true
        })
    }
}

export default new ManagerDAO()