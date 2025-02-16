require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 5000,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',

    REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD || '',

    MPESA: {
        CONSUMER_KEY: process.env.MPESA_CONSUMER_KEY,
        CONSUMER_SECRET: process.env.MPESA_CONSUMER_SECRET,
        SHORTCODE: process.env.MPESA_SHORTCODE,
        PASSKEY: process.env.MPESA_PASSKEY,
        CALLBACK_URL: process.env.MPESA_CALLBACK_URL
    },
    PAYPAL: {
        CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
        CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET
    },
    BANK: {
        API_KEY: process.env.BANK_API_KEY
    },
    EMAIL: {
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: process.env.SMTP_PORT,
        SMTP_USER: process.env.SMTP_USER,
        SMTP_PASS: process.env.SMTP_PASS
    },
    AFFILIATE: {
        COMMISSION_RATE: 5 // $5 per referral
    }
};

