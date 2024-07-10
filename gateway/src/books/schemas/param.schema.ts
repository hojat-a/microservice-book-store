import * as Joi from 'joi'

export const paramSchema = Joi.object({
  id: Joi.string().hex().length(24),
})