import nodemailer from 'nodemailer'
import { MAIL_USER, MAIL_PASS, BACK_URL } from '@config'
import { logger } from '@/utils/logger'
import { Locales } from '@/i18n/i18n-types'
import L from '@/i18n/i18n-node'

class EmailService {

    private transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASS,
        },
    })

    public async sendSignUpConfirmationMail(email:string, confirmationCode:string, locale: Locales): Promise<string> {
        const info = await this.transporter.sendMail({
            from: L[locale].SET_CONFIRMATION_MAIL_FROM({ MAIL_USER }),
            to: email,
            subject: L[locale].SET_CONFIRMATION_MAIL_SUBJECT(),
            text: L[locale].SET_CONFIRMATION_MAIL_TEXT({ BACK_URL, confirmationCode }),
            html: L[locale].SET_CONFIRMATION_MAIL_HTML({ BACK_URL, confirmationCode })
        })
        logger.info(`SignUpConfirmationMail sent to ${email} - messageId::${info.messageId}`)
        return info.messageId
    }

}
export default EmailService