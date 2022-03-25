import adminDao from "./admin.dao"; 
import {IMandatoryCrud} from "../../common/crud.interface";
import IAdmin from "./admin.interface";

class AdminService implements IMandatoryCrud<IAdmin,string> {
    async add(resource : IAdmin){
        return await adminDao.addAdmin(resource)
    }

    async getByEmail(email : string){
        return await adminDao.getAdminByEmail(email) 
    }
    async getOne(id : string){
        return await adminDao.getOne(id)
    }
}

export default new AdminService()
