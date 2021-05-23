import { Router } from 'express';

import { UsersRouter } from '@modules/users/infra/http/routes/users.routes';

const Routes = Router();

Routes.use('/users', UsersRouter);

export { Routes };
