import type { Translation } from '../i18n-types'

const fr: Translation = {

	SET_CONFIRMATION_MAIL_FROM: `"L'équipe Wizz-Us" <{MAIL_USER}>"`,
	SET_CONFIRMATION_MAIL_SUBJECT: `Merci de confirmer votre compte`,
	SET_CONFIRMATION_MAIL_TEXT:
		`Bonjour, 
		merci pour votre inscription à Wizz_Us, 
		confirmer votre email en copiant collant ce lien dans votre navigateur :
		{BACK_URL}/signup-confirmation/{confirmationCode}`,
	SET_CONFIRMATION_MAIL_HTML:
		`<b>
			Bonjour,</br>
			Merci pour votre inscription à Wizz-Us,</br>
			confirmer votre email en cliquant sur le lien suivant :</br>
			<a href='{BACK_URL}/signup-confirmation/{confirmationCode}'> Cliquez ici</a>
		</b>`,
}

export default fr
