import CustomerModel from "./customer.model";
import ICustomer , {ICustomerPatch} from "./customer.interface";
import IObjectProps from "../../common/props.interface";

class CustomerDAO { 
    async create(data : ICustomer){
        return await CustomerModel.create(data)
    }

    async getOne(id : string){
        return await CustomerModel.findById(id)
    }

    async getAll(limit : number , page : number , filter ?: IObjectProps){
        return await CustomerModel.find({})
        .skip(page).limit(limit).select(filter)
    }

    async remove(id : string){
        return await CustomerModel.deleteOne({_id : id})
    } 

    async update(id : string , data : ICustomerPatch){
        return await CustomerModel.findByIdAndUpdate(id ,data , {
            useFindAndModify : false , 
            new : true
        })
    }
}

export default new CustomerDAO()