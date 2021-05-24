import { Router } from 'express';

import { UsersRouter } from '@modules/users/infra/http/routes/users.routes';
import { SessionsRouter } from '@modules/users/infra/http/routes/sessions.routes';

const Routes = Router();

Routes.use('/users', UsersRouter);
Routes.use('/sessions', SessionsRouter);

export { Routes };
