import adminDao from "./admin.dao"; 
import {IMandatoryCrud} from "../../common/crud.interface";
import IAdmin from "./admin.interface";

class AdminService implements IMandatoryCrud<IAdmin,string> {
    async add(resource : IAdmin){
        return await adminDao.addAdmin(resource)
    }

    async getOne(value : string){
        return await adminDao.getAdminByEmail(value)
    }
}

export default new AdminService()
