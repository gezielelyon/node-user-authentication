import { uuid } from 'uuidv4';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/database/typeorm/entities/User';
import { IUsersRepository } from '../interfaces/IUsersRepository';

export class FakeUsersrepository implements IUsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, data);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<void> {
    const userFoundById = this.users.findIndex(
      eachUser => eachUser.id === user.id,
    );

    if (userFoundById) {
      this.users[userFoundById] = user;
    } else {
      this.users.push(user);
    }
  }

  public async findById(id: string): Promise<User | undefined> {
    const userFoundById = this.users.find(user => user.id === id);

    return userFoundById;
  }

  public async findByName(name: string): Promise<User | undefined> {
    const userFoundByName = this.users.find(user => user.name === name);

    return userFoundByName;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const userFoundByEmail = this.users.find(user => user.email === email);

    return userFoundByEmail;
  }
}
