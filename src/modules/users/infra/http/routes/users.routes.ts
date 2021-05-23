import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { UsersController } from '../controllers/UsersController';

const UsersRouter = Router();

UsersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(5).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(7).required(),
    },
  }),
  UsersController.store,
);

export { UsersRouter };
