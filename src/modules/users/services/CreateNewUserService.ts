import { injectable, inject } from 'tsyringe';

import { User } from '@modules/users/infra/database/typeorm/entities/User';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUsersRepository } from '../repositories/interfaces/IUsersRepository';

@injectable()
class CreateNewUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(data: ICreateUserDTO): Promise<User> {
    const user = await this.usersRepository.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    return user;
  }
}

export { CreateNewUserService };
