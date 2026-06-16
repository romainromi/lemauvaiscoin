import Joi from 'joi';

export const categorieSchema = Joi.object({
    name: Joi.string().required(),
 
});
