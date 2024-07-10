import * as Joi from 'joi';

export const findAllSchema = Joi.object({
  page: Joi.number().greater(0),
  pageSize: Joi.number().greater(1),
  title: Joi.string().min(3).max(24).alphanum(),
  author: Joi.string().min(3).max(24).alphanum(),
  genre: Joi.string().min(3).max(24).alphanum(),
  releaseYear: Joi.number().greater(1300).less(1500)
});