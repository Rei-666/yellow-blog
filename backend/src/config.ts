import dotenv from 'dotenv';

dotenv.config();

class EnvError extends Error {
  constructor(envVariableName: string) {
    super(`${envVariableName} wasn't specified in environmental variables.`);
  }
}

interface EnvVariables {
  DB_URL: string
  SECRET: string
  ORIGIN: string
}

const {
  DB_URL, SECRET, ORIGIN, env,
} = process.env;

try {
  if (!DB_URL) throw new EnvError('DB_URL');
  if (!SECRET) throw new EnvError('SECRET');
  if (!ORIGIN && env === 'production') throw new EnvError('ORIGIN');
} catch (e) {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
}

const CheckedEnvVariables: EnvVariables = { DB_URL, SECRET, ORIGIN: ORIGIN || 'localhost:3000' };

export default CheckedEnvVariables;
