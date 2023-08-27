import dotenv from 'dotenv';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';

dotenv.config();

export type Environment = 'development' | 'staging' | 'production';

interface AppConfig {
  DATABASE_URL: string;
  REDIS_URL: string;
  PORT: string;
  SESSION_SECRET: string;
  NODE_ENV: Environment;
}

export const appConfig: AppConfig = {
  DATABASE_URL: process.env.DATABASE_URL!,
  REDIS_URL: process.env.REDIS_URL!,
  PORT: process.env.PORT!,
  SESSION_SECRET: process.env.SESSION_SECRET!,
  NODE_ENV: process.env.NODE_ENV as Environment,
};
