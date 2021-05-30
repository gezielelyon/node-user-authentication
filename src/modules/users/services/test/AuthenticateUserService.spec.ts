import { FakeUsersrepository } from '@modules/users/repositories/mocks/FakeUsersRepository';
import { FakeHashProvider } from '@modules/users/providers/HashProvider/mocks/FakeHashProvider';
import { FakeJWTProvider } from '@modules/users/providers/JWTProvider/mocks/FakeJWTProvider';
import { AppError } from '@shared/error/AppError';
import { AuthenticateUserService } from '../AuthenticateUserService';

let fakeUsersRepository: FakeUsersrepository;
let fakeHashProvider: FakeHashProvider;
let fakeJWTProvider: FakeJWTProvider;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersrepository();
    fakeHashProvider = new FakeHashProvider();
    fakeJWTProvider = new FakeJWTProvider();
    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeJWTProvider,
    );
  });

  it('Should be able to authenticate an user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'JohnDoe',
      email: 'johndoe@hotmail.com',
      password: '1234567',
    });

    const response = await authenticateUserService.execute({
      email: 'johndoe@hotmail.com',
      password: '1234567',
    });

    expect(response.user).toEqual(user);
  });

  it('Should not be able to authenticate an user with a wrong email', async () => {
    await fakeUsersRepository.create({
      name: 'JohnDoe',
      email: 'johndoe@hotmail.com',
      password: '1234567',
    });

    await expect(
      authenticateUserService.execute({
        email: 'notexist@hotmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate an user with a wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'JohnDoe',
      email: 'johndoe@hotmail.com',
      password: '1234567',
    });

    await expect(
      authenticateUserService.execute({
        email: 'johndoe@hotmail.com',
        password: 'wrongpassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
