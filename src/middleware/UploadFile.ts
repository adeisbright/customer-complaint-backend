import multer from "multer";
import path from "path";

const currentPath = __dirname;
const directoryName = path.dirname(currentPath);

class UploadFile {
    saveToMemory = multer({
        storage: multer.memoryStorage(),
        limits: {
            fileSize: 200 * 1024 * 1024
        }
    });

    saveToDisk = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(directoryName, "../storage/app/temp/"));
        },
        filename: function (req, file, cb) {
            const date = new Date().getDate();
            const fileName = `${date}-${file.originalname}`;
            cb(null, fileName);
        }
    });
}

const uploader = new UploadFile();
export const diskStorage = multer({ storage: uploader.saveToDisk });
export default uploader.saveToMemory;
