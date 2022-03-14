import type { BaseTranslation } from '../i18n-types'

const en: BaseTranslation = {
	HI: 'Hi {name:string}! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n',
	
	//HTTP EXCEPTION
	HTTP_USER_400_ID: "You're not userId",
	HTTP_USER_400_DATA: "You're not userData",
	HTTP_USER_409_USER: "You're not user",
	HTTP_USER_409_EMAIL: "You're email {email:string} already exists"
}

export default en
