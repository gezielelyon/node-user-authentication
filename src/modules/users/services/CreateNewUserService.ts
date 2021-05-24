import { injectable, inject } from 'tsyringe';

import { User } from '@modules/users/infra/database/typeorm/entities/User';
import { AppError } from '@shared/error/AppError';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUsersRepository } from '../repositories/interfaces/IUsersRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

@injectable()
class CreateNewUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: ICreateUserDTO): Promise<User> {
    const userFoundByName = await this.usersRepository.findByName(data.name);

    if (userFoundByName) {
      throw new AppError('This name is already in use');
    }

    const userFoundByEmail = await this.usersRepository.findByEmail(data.email);

    if (userFoundByEmail) {
      throw new AppError('This email is already in use');
    }

    const passwordHashed = await this.hashProvider.generate(data.password);

    const user = await this.usersRepository.create({
      name: data.name,
      email: data.email,
      password: passwordHashed,
    });

    return user;
  }
}

export { CreateNewUserService };
