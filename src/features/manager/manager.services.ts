import IManager , {IManagerPatch} from "./manager.interface";
import { IMandatoryCrud  , IOptionalCrud} from "../../common/crud.interface"; 
import managerDao from "./manager.dao";
import IObjectProps from "../../common/props.interface";


class ManagerService implements 
IMandatoryCrud<IManager,string> , 
IOptionalCrud<string , IManagerPatch>{
    async add(resource: IManager){
        return await managerDao.create(resource)
    }

    async getOne(id: string){
        return await managerDao.getOne(id)
    }

    async getAll(limit: number , page: number  , filter  ?: IObjectProps){
        return await managerDao.getAll(limit , page , filter)
    }

    async delete(id: string){
        return await managerDao.remove(id)
    }

    async update(id :  string, data: IManagerPatch){
        return await managerDao.update(id , data)
    }
   
    async findByManyFields(data :IObjectProps[]){
        return await managerDao.findByManyFields(data)
    }
}

export default new ManagerService()