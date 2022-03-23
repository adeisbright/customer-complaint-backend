import ComplaintModel from "./complaint.model";
import IComplaint , {IComplaintPatch} from "./complaint.interface";
import IObjectProps from "../../common/props.interface";

class ComplaintDAO { 
    async create(data : IComplaint){
        return await ComplaintModel.create(data)
    }

    async getOne(id : string){
        return await ComplaintModel.findById(id)
    }

    async getAll(limit : number , page : number , filter ?: IObjectProps){
        return await ComplaintModel.find({})
        .skip(page).limit(limit).select(filter)
    }

    async remove(id : string){
        return await ComplaintModel.deleteOne({_id : id})
    } 

    async update(id : string , data : IComplaintPatch){
        return await ComplaintModel.findByIdAndUpdate(id ,data , {
            useFindAndModify : false , 
            new : true
        })
    }
}

export default new ComplaintDAO()