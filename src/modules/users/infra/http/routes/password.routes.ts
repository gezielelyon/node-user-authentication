import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { ForgotPasswordController } from '../controllers/ForgotPasswordController';

const PasswordRouter = Router();

PasswordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  ForgotPasswordController.create,
);

export { PasswordRouter };
