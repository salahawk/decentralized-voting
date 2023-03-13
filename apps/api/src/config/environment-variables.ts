import * as Joi from 'joi';

export interface EnvironmentVariables {
  DATABASE_URL: string;
  CONTRACT_ADDRESS: string;
  BSCSCAN_API_KEY: string;
}

export const validationSchemaForEnv = Joi.object<EnvironmentVariables, true>({
  DATABASE_URL: Joi.string().required(),
  CONTRACT_ADDRESS: Joi.string().required(),
  BSCSCAN_API_KEY: Joi.string().required(),
});
