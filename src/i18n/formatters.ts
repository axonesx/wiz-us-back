import type { FormattersInitializer } from 'typesafe-i18n'
import type { Locales, Formatters } from './i18n-types'

export const initFormatters: FormattersInitializer<Locales, Formatters> = (locale: Locales) => {

	const dateFormatter = new Intl.DateTimeFormat(locale, { weekday: 'long' })

	const formatters: Formatters = {
		uppercase: (value) => value.toUpperCase(),
		weekday: (value) => dateFormatter.format(value)
	}

	return formatters
}