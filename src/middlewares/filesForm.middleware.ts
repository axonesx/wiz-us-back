import { ValidationError } from 'class-validator'
import { HttpException } from '@exceptions/HttpException'
import { NextFunction, Response } from 'express'
import { RequestWithFormidable } from '@/interfaces/request.interface'
import formidable from 'formidable'

const filesFormMiddleWare = (error: HttpException, req: RequestWithFormidable, res: Response, next: NextFunction) => { 
    const form = formidable({})

  form.parse(req, (error: any, fields: formidable.Fields, files: formidable.Files) => {
    if (error) {
      const message = error.map((error: ValidationError) => Object.values(error.constraints)).join(', ')
      next(new HttpException(400, message))
    }
    req.fields = fields
    req.files = files
    next()
  })
}

// const filesFormMiddleWare = (req, res, next) => {
//     const form = formidable({})

//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         next(err);
//         return;
//       }
//       req.fields = fields;
//       req.files = files;
//       next();
//     })
//   }
// }

export default filesFormMiddleWare
