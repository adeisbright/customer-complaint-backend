import IObjectProps from "./props.interface";

const isObject = (arg: IObjectProps) => Object.is(typeof arg, "object");

/**
 * @description Checks the properties of an object against
 * a collection of objects. Returns true if the properties of the
 * provided object is unique when compared to the collection
 * @param {Class} service  A class wih service method to access database queries
 * @param {Object} resource Object to use for comparison
 * @param {[Object]}options properties of the object
 * @returns
 */
const checkIfDuplicate = async (
    service: any,
    resource: any,
    options: IObjectProps[]
): Promise<boolean> => {
    try {
        if (!Array.isArray(options)) return false;
        const someNotObject = options.some((option) => isObject(option));
        if (!someNotObject) return false;

        const data = await service.findByManyFields(options);
        if (data.length === 0) {
            return true;
        } else if (data && data.length > 1) {
            return false;
        } else if (data && resource._id === undefined) {
            return false;
        } else if (data && String(data[0]._id) !== String(resource._id)) {
            return false;
        }

        return true;
    } catch (error: any) {
        return false;
    }
};

export default checkIfDuplicate;
