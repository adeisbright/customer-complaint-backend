
class FileMover {
    uploader: any;
    constructor(uploader: any) {
        this.uploader = uploader;
    }

    async uploadToDisk(fileName: string, uploadDir: string, fileDir: string) {
        const date = new Date().getDate();
        const parseName = `${date}-${fileName}`;
        this.uploader.createDirectory(fileDir);
        return await this.uploader.moveFile(parseName, uploadDir, fileDir);
    }
}

export default FileMover;
