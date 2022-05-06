import formidable from 'formidable'
import IncomingForm from 'formidable/Formidable'
import path from 'path'
import * as fs from 'fs'

const deleteFilesFromDirUnlessOne = (avatarPath: string):void => {
    const files = fs.readdirSync(path.dirname(avatarPath))
    for (const file of files) {
        if(file !== path.basename(avatarPath)){
            fs.unlinkSync(path.join(path.dirname(avatarPath), file))
        }
    }
}

const createFilePath = (pathString: string): string => {
    return path.join(__dirname,  '..',  '..', '..', "public", "files", pathString)
}

const formAvatar = (id: string): IncomingForm => {
    const uploadFolder = createFilePath(id)
    if(!fs.existsSync(uploadFolder)){
        fs.mkdirSync(uploadFolder)
    }
    const form = formidable({
        uploadDir: uploadFolder,
        multiples: true,
        maxFileSize: 50 * 1024 * 1024,
        keepExtensions: true,
    })
    return form
}

export {
    formAvatar,
    deleteFilesFromDirUnlessOne,
    createFilePath,
}
