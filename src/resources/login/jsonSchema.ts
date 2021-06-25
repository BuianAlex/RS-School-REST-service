import { Schema } from 'express-validator';

export const schema: Schema = {
  password: {
    in: 'body',
    isLength: {
      options: { min: 5 },
    },
    notEmpty: true,
  },
  login: {
    notEmpty: true,
    isLength: {
      options: { min: 5 },
    },
  },
};
