import mongoose from "mongoose" 

/**
 * @description Tries to Cast a provided string to BSON 
 * @param {String} id 
 * @returns {Boolean} true or false depending if String can be casted to BSON 
 */
 const isValidId = (id:string) : boolean => {
    let isValidId = mongoose.Types.ObjectId.isValid(id) ? true : false 
    return isValidId
} 

export default isValidId
