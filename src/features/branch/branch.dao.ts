import IBranch , {IBranchUpdate} from "./branch.interface"; 
import BranchModel from "./branch.model"; 
import IObjectProps from "../../common/props.interface";

class BranchDAO {
    async create(data : IBranch){
        return await BranchModel.create(data)
    }

    async getOne(id : string){
        return await BranchModel.findById(id)
    }

    async getAll(limit : number , page : number , filter ?: IObjectProps){
        return await BranchModel.find({})
        .skip(page).limit(limit).select(filter)
    }

    async remove(id : string){
        return await BranchModel.deleteOne({_id : id})
    } 

    async update(id : string , data : IBranchUpdate){
        return await BranchModel.findByIdAndUpdate(id ,data , {
            useFindAndModify : false , 
            new : true
        })
    }
}

export default new BranchDAO()