import dotenv from 'dotenv';

dotenv.config();

export const {
  DB_PASSWORD, DB_USERNAME, DB_DATABASE, SECRET,
} = process.env;
