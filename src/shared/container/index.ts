import { container } from 'tsyringe';

// Users-s repository
import { IUsersRepository } from '@modules/users/repositories/interfaces/IUsersRepository';
import { UsersRepository } from '@modules/users/infra/database/typeorm/repositories/UsersRepository';

// Password's Hash provider
import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';
import { BcryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BcryptHashProvider';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
