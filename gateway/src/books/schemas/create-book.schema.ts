import * as Joi from 'joi';

export const createBookSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  imageId: Joi.string().hex().length(24),
  category: Joi.string().valid('English', 'Math')
});