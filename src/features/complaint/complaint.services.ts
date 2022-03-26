import IComplaint, { IComplaintPatch } from "./complaint.interface";
import IObjectProps from "../../common/props.interface";
import { IMandatoryCrud, IOptionalCrud } from "../../common/crud.interface";
import complaintDao from "./complaint.dao";

class ComplaintService
    implements
        IMandatoryCrud<IComplaint, string>,
        IOptionalCrud<string, IComplaintPatch>
{
    async add(resource: IComplaint) {
        return await complaintDao.create(resource);
    }

    async getOne(id: string) {
        return await complaintDao.getOne(id);
    }

    async getAll(limit: number, page: number, filter?: IObjectProps) {
        return await complaintDao.getAll(limit, page, filter);
    }

    async delete(id: string) {
        return await complaintDao.remove(id);
    }

    async update(id: string, data: IComplaintPatch) {
        return await complaintDao.update(id, data);
    }
}

export default new ComplaintService();
