import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import { SessionsController } from '../controllers/SessionsController';

const SessionsRouter = Router();

SessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().min(7).required(),
    },
  }),
  SessionsController.store,
);

export { SessionsRouter };
