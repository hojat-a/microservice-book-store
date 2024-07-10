import * as Joi from 'joi';

export const createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().required(),
  releaseYear: Joi.number().required(),
  publisher: Joi.string().required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
});