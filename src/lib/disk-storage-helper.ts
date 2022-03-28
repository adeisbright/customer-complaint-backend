import { promises as fs} from "fs"
import path from "path"
const currentPath = __dirname;
const directoryName = path.dirname(currentPath);

class DiskStorageHelper {
    static async moveFile(fileName: string, oldPath: string, newPath: string) {
        try {
            const oldLocation = `${oldPath}/${fileName}`;
            const newLocation = `${newPath}/${fileName}`;
            await fs.rename(
                path.join(directoryName, oldLocation),
                path.join(directoryName, newLocation)
            );
            return path.join(directoryName, newLocation);
        } catch (error) {
            return error;
        }
    }

    static async createDirectory(name: string) {
        try {
            await fs.mkdir(path.join(directoryName, name));
        } catch (error: any) {
            return error;
        }
    }

    static async deleteFile(fileLocation: string) {
        try {
            await fs.unlink(fileLocation);
        } catch (error) {
            return error;
        }
    }
}

export default DiskStorageHelper;
