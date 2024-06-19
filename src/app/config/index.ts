import dotenv from 'dotenv'

dotenv.config()

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  salt_round: process.env.SALT_ROUND,
  access_token: process.env.JWT_ACCESS_SECRET,
  access_token_expire_in: process.env.JWT_ACCESS_EXPIRE_IN,
  refresh_token: process.env.JWT_REFRESH_SECRET,
  refresh_expire_in: process.env.JWT_REFRESH_EXPIRE_IN,
}
