import { I18n } from '@/i18n';
import { NextFunction, Request, Response } from 'express';
import L from '../i18n/i18n-node'

class userNameController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.params
      let locale = I18n.getPreferredLocale(req)
      locale = 'en'
      res.send(L[locale].HI({ name }))
    } catch (error) {
      next(error);
    }
  };
}

export default userNameController;
