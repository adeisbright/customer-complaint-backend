import IBranch , {IBranchUpdate} from "./branch.interface"; 
import { IMandatoryCrud  , IOptionalCrud} from "../../common/crud.interface"; 
import branchDao from "./branch.dao";
import IObjectProps from "../../common/props.interface";


class BranchService implements 
IMandatoryCrud<IBranch,string> , 
IOptionalCrud<string , IBranchUpdate>{
    async add(resource: IBranch){
        return await branchDao.create(resource)
    }

    async getOne(id: string){
        return await branchDao.getOne(id)
    }

    async getAll(limit: number , page: number  , filter  ?: IObjectProps){
        return await branchDao.getAll(limit , page , filter)
    }

    async delete(id: string){
        return await branchDao.remove(id)
    }

    async update(id :  string, data: IBranchUpdate){
        return await branchDao.update(id , data)
    }

    async findByManyFields(data :IObjectProps[]){
        return await branchDao.findByManyFields(data)
    }
}

export default new BranchService()