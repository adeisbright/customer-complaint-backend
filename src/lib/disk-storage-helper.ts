const fs = require("fs").promises;
const path = require("path");
const currentPath = __dirname;
const directoryName = path.dirname(currentPath);

class DiskStorageHelper {

    static async moveFile(fileName : string, oldPath:string, newPath : string){
        try {
            let oldLocation = `${oldPath}/${fileName}`;
            let newLocation = `${newPath}/${fileName}`;
            await fs.rename(
                path.join(directoryName, oldLocation),
                path.join(directoryName, newLocation)
            );
            return path.join(directoryName, newLocation);
        } catch (error) {
            return error;
        }
    }

    static async createDirectory (name : string){
        try {
            let createDir = await fs.mkdir(path.join(directoryName, name));
            if (createDir) {
                return "The directory was created";
            } else {
                throw new Error("Problem while trying to create dir");
            }
        } catch (error : any) {
            return error;
        }
    }
   
    static async deleteFile(fileLocation : string){
        try {
            const result = await fs.unlink(fileLocation) 
            if (result){
                return "File was removed successfully"
            }
        } catch (error) {
            return error;
        }
    }
}

export default DiskStorageHelper 