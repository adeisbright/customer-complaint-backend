import IAdmin from "./admin.interface";
import AdminModel from "./admin.model";

class AdminDAO {
    async addAdmin(data: IAdmin): Promise<any> {
        return await AdminModel.create(data);
    }

    async getAdminByEmail(email: string): Promise<any> {
        return await AdminModel.findOne({ email: email });
    }

    async getOne(id: string): Promise<any> {
        return await AdminModel.findById(id);
    }
}

export default new AdminDAO();
