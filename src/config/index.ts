import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
    NODE_ENV,
    PORT,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE,
    TOKEN_SECRET,
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRES_IN,
    LOG_FORMAT,
    LOG_DIR,
    ORIGIN,
    MAIL_USER,
    MAIL_PASS,
    BACK_URL,
    FRONT_URL,
} = process.env;

