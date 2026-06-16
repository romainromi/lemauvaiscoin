

import Joi from 'joi';

export const annonceSchema = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().positive().precision(2),
    city: Joi.string().required(),
    category_id: Joi.number().required(),
    image: Joi.string()
});
