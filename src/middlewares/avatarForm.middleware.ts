import { HttpException } from '@exceptions/HttpException'
import { NextFunction, Response } from 'express'
import { RequestWithFormidable } from '@/interfaces/request.interface'
import { formAvatar } from '@/services/utils/file.service'

const avatarFormMiddleWare = ( req: RequestWithFormidable, res: Response, next: NextFunction) => {
  const filesName: string[] = []
  const filesPath: string[] = []
  const form = formAvatar(req.params.id)
  form.on('file', (name, file) => {
    filesName.push(process.env.BACK_URL+`/files/${req.params.id}/`+file.newFilename)
    filesPath.push(file.filepath)
  })
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(new HttpException(400, err.message))
    }
    req.fields = fields
    req.files = files
    req.filesName = filesName
    req.filesPath = filesPath
    next()
  })
}

export default avatarFormMiddleWare
