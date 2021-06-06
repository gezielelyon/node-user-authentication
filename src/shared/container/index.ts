import { container } from 'tsyringe';

import './providers/index';

// Users's repository
import { IUsersRepository } from '@modules/users/repositories/interfaces/IUsersRepository';
import { UsersRepository } from '@modules/users/infra/database/typeorm/repositories/UsersRepository';

// Password's Hash provider
import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';
import { BcryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BcryptHashProvider';

// JWT provider
import { IJWTProvider } from '@modules/users/providers/JWTProvider/models/IJWTProvider';
import { JsonWebTokenProvider } from '@modules/users/providers/JWTProvider/implementations/JsonWebTokenProvider';

// User Tokens Repository
import { IUserTokensRepository } from '@modules/users/repositories/interfaces/IUserTokensRepository';
import { UserTokensReposioty } from '@modules/users/infra/database/typeorm/repositories/UserTokensReposioty';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);

container.registerSingleton<IJWTProvider>('JWTProvider', JsonWebTokenProvider);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensReposioty,
);
