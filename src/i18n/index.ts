import { Locales } from '../i18n/i18n-types'
import { initAcceptLanguageHeaderDetector, initRequestParametersDetector } from 'typesafe-i18n/detectors'
import { detectLocale } from '../i18n/i18n-util'
import { Request } from 'express'



class I18n {

    public static getPreferredLocale = (req: Request): Locales => {
        const requestParametersDetector = initRequestParametersDetector(req, 'locale')
        const acceptLanguageDetector = initAcceptLanguageHeaderDetector(req)
        //TODO : ADD A SESSION DETECTOR HERE TO RETURN a session language
        return detectLocale(requestParametersDetector, acceptLanguageDetector)
    }
}

export { I18n }
