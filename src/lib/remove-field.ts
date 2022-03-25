import IObjectProps from "../common/props.interface"

const fieldRemoval = (data  :IObjectProps , fields : string[]) => {
    const clone = Object.create({}) 
   
    if (data){
        Object.assign(clone , data) 
        fields.map(field => {
            if (clone[field] !== undefined){
                console.log(clone[field])
                delete clone[field]
            }
        })
    }
    return {
        status : clone ? 1 : 0 , 
        clone : clone
    }
}
            
export default fieldRemoval
            