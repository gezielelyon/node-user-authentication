import { UserToken } from '@modules/users/infra/database/typeorm/entities/UserToken';

export interface IUserTokensRepository {
  create(user_id: string): Promise<UserToken>;
  save(userToken: UserToken): Promise<void>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
