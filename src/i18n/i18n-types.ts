// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'en'
	| 'fr'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	/**
	 * Hi {name}! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n
	 * @param {string} name
	 */
	HI: RequiredParams<'name'>
	/**
	 * You're not userId
	 */
	HTTP_USER_400_ID: string
	/**
	 * You're not userData
	 */
	HTTP_USER_400_DATA: string
	/**
	 * You're not user
	 */
	HTTP_USER_409_USER: string
	/**
	 * You're email {email} already exists
	 * @param {string} email
	 */
	HTTP_USER_409_EMAIL: RequiredParams<'email'>
}

export type TranslationFunctions = {
	/**
	 * Hi {name}! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n
	 */
	HI: (arg: { name: string }) => LocalizedString
	/**
	 * You're not userId
	 */
	HTTP_USER_400_ID: () => LocalizedString
	/**
	 * You're not userData
	 */
	HTTP_USER_400_DATA: () => LocalizedString
	/**
	 * You're not user
	 */
	HTTP_USER_409_USER: () => LocalizedString
	/**
	 * You're email {email} already exists
	 */
	HTTP_USER_409_EMAIL: (arg: { email: string }) => LocalizedString
}

export type Formatters = {}
