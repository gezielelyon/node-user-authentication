import { container } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/interfaces/IUsersRepository';
import { UsersRepository } from '@modules/users/infra/database/typeorm/repositories/UsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
