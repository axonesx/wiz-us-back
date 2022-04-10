import type { BaseTranslation } from '../i18n-types'

const en: BaseTranslation = {

	SET_CONFIRMATION_MAIL_FROM: `"Wizz Us Team" <{MAIL_USER}>"`,
	SET_CONFIRMATION_MAIL_SUBJECT: `Please confirm your account`,
	SET_CONFIRMATION_MAIL_TEXT:
		`Hi, 
		Thank you for subscribing to Wizz-Us. 
		Please confirm your email by copying and pasting the following link in your browser :
		{BACK_URL}/signup-confirmation/{confirmationCode}`,
	SET_CONFIRMATION_MAIL_HTML:
		`<b>
			Hi,</br>
			Thank you for subscribing to Wizz-Us.</br>
			Please confirm your email by clicking on the following link :</br>
			<a href='{BACK_URL}/signup-confirmation/{confirmationCode}'> Click here</a>
		</b>`,
}

export default en
