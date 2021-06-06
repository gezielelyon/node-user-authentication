import { Repository, getRepository } from 'typeorm';

import { IUserTokensRepository } from '@modules/users/repositories/interfaces/IUserTokensRepository';
import { UserToken } from '../entities/UserToken';

class UserTokensReposioty implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async create(user_id: string): Promise<UserToken> {
    const token = this.ormRepository.create({
      user_id,
    });

    await this.save(token);

    return token;
  }

  public async save(userToken: UserToken): Promise<void> {
    await this.ormRepository.save(userToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const tokenFound = await this.ormRepository.findOne({
      where: {
        token,
      },
    });

    return tokenFound;
  }
}

export { UserTokensReposioty };
