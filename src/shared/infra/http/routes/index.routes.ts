import { Router } from 'express';

import { UsersRouter } from '@modules/users/infra/http/routes/users.routes';
import { SessionsRouter } from '@modules/users/infra/http/routes/sessions.routes';
import { PasswordRouter } from '@modules/users/infra/http/routes/password.routes';

const Routes = Router();

Routes.use('/users', UsersRouter);
Routes.use('/sessions', SessionsRouter);
Routes.use('/password', PasswordRouter);

export { Routes };
