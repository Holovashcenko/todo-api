import dotenv from 'dotenv';
import('ts-node/register');

dotenv.config();

const config = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: './src/migrations',
    extension: 'ts',
  },
  dialect: 'pg',
};

export default config;