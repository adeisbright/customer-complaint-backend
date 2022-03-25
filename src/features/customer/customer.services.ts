import ICustomer , {ICustomerPatch} from "./customer.interface";
import IObjectProps from "../../common/props.interface";
import { IMandatoryCrud  , IOptionalCrud} from "../../common/crud.interface"; 
import customerDao from "./customer.dao";


class CustomerService implements 
IMandatoryCrud<ICustomer,string> , 
IOptionalCrud<string , ICustomerPatch>{
    async add(resource: ICustomer){
        return await customerDao.create(resource)
    }

    async getOne(id: string){
        return await customerDao.getOne(id)
    }

    async getByEmail(email : string){
        return await customerDao.getAdminByEmail(email) 
    }

    async getAll(limit: number , page: number  , filter  ?: IObjectProps){
        return await customerDao.getAll(limit , page , filter)
    }

    async delete(id: string){
        return await customerDao.remove(id) 
    }

    async update(id :  string, data: ICustomerPatch){
        return await customerDao.update(id , data)
    }

    async findByManyFields(data :IObjectProps[]){
        return await customerDao.findByManyFields(data)
    }
}

export default new CustomerService() 