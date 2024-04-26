import dotenv from "dotenv";

dotenv.config();
class EnvConfiguration {
  static PORT = process.env.PORT;
  static NODE_ENV = process.env.NODE_ENV;
  static FRONTEND_URL = process.env.FRONTEND_URL;
  static BACKEND_URL = process.env.BACKEND_URL

  static DB_TYPE = process.env.DB_TYPE;
  static DB_HOST = process.env.DB_HOST;
  static DB_PORT = process.env.DB_PORT || 5432;
  static DB_USERNAME = process.env.DB_USERNAME;
  static DB_PASSWORD = process.env.DB_PASSWORD;
  static DB_NAME = process.env.DB_NAME;

  static SMTP_PORT = process.env.SMTP_PORT;
  static SMTP_HOST = process.env.SMTP_HOST ?? "localhost";
  static SMTP_USER = process.env.SMTP_USER;
  static SMTP_PASSWORD = process.env.SMTP_PASSWORD;
  static MAIL_FROM = process.env.MAIL_FROM;
  static LOG_LEVEL = process.env.LOG_LEVEL;

  static ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ?? "";
  static ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY
  static REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET ?? "";
  static REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY

  static JWT_FORGOT_PASSWORD_SECRET = process.env.JWT_FORGOT_PASSWORD_SECRET ?? "";
  static JWT_FORGOT_PASSWORD_EXPIRY = process.env.JWT_FORGOT_PASSWORD_EXPIRY


}

export enum Environment {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
  TEST = "test",
}

export { EnvConfiguration };
