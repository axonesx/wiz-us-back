import { HttpException } from '@exceptions/HttpException'
import { NextFunction, Response } from 'express'
import { RequestWithFormidable } from '@/interfaces/request.interface'
import { formAvatar } from '@/services/utils/file.service'
import { logger } from '@/utils/logger'

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
      logger.error(err.message)
      next(new HttpException(400, 'formFile.invalid'))
    }
    req.fields = fields
    req.files = files
    req.filesName = filesName
    req.filesPath = filesPath
    next()
  })
}

export default avatarFormMiddleWare
