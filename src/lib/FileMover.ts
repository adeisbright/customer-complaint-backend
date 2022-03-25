
class FileMover {
    uploader : any
    constructor(uploader : any) {
        this.uploader = uploader;
    }

    async uploadToDisk(fileName : any, uploadDir : any, fileDir : any) {
        let date = new Date().getDate();
        let parseName = `${date}-${fileName}`;  
        this.uploader.createDirectory(fileDir);
        return await this.uploader.moveFile(parseName, uploadDir, fileDir);
    }
}

export default FileMover