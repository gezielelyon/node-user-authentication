import { FakeUsersrepository } from '@modules/users/repositories/mocks/FakeUsersRepository';
import { FakeHashProvider } from '@modules/users/providers/HashProvider/mocks/FakeHashProvider';
import { CreateNewUserService } from '@modules/users/services/CreateNewUserService';
import { AppError } from '@shared/error/AppError';

let fakeUsersRepository: FakeUsersrepository;
let fakeHashProvider: FakeHashProvider;
let createNewUserService: CreateNewUserService;

describe('CreateNewUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersrepository();
    fakeHashProvider = new FakeHashProvider();
    createNewUserService = new CreateNewUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to create a new user', async () => {
    const user = await createNewUserService.execute({
      name: 'JohnDoe',
      email: 'johndoe@hotmail.com',
      password: '1234567',
    });

    expect(user).toHaveProperty('id');
    expect(user).toBeDefined();
    expect(user.name).toBe('JohnDoe');
    expect(user.email).toBe('johndoe@hotmail.com');
  });

  it('Should not be able to create a new user with a name already used', async () => {
    await fakeUsersRepository.create({
      name: 'JohnDoe',
      email: 'johndoe@hotmail.com',
      password: '1234567',
    });

    await expect(
      createNewUserService.execute({
        name: 'JohnDoe',
        email: 'johndoe@hotmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new user with an email already used', async () => {
    await fakeUsersRepository.create({
      name: 'JohnDoe',
      email: 'johndoe@hotmail.com',
      password: '1234567',
    });

    await expect(
      createNewUserService.execute({
        name: 'AnotherJohnDoe',
        email: 'johndoe@hotmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
