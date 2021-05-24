import { injectable, inject } from 'tsyringe';
import {} from 'jsonwebtoken';

import { User } from '@modules/users/infra/database/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/interfaces/IUsersRepository';
import { IJWTProvider } from '@modules/users/providers/JWTProvider/models/IJWTProvider';
import { AppError } from '@shared/error/AppError';
import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('JWTProvider')
    private jwtProvider: IJWTProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination');
    }

    const passwordMatched = await this.hashProvider.compare(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination');
    }

    delete user.password;

    const token = await this.jwtProvider.generate(user.id);

    return {
      user,
      token,
    };
  }
}

export { AuthenticateUserService };
