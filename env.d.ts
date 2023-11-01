declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    SENDGRID_API_KEY: string;
    MAILADDRESS: string;
    RESEND_API_KEY: string;
    EMAIL_KAREN: string;
    EMAIL_DOCE: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    FACEBOOK_CLIENT_ID: string;
    FACEBOOK_CLIENT_SECRET: string;
  }
}
