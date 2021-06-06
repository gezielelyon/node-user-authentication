import { injectable, inject } from 'tsyringe';
import path from 'path';

import { AppError } from '@shared/error/AppError';

import { IUsersRepository } from '@modules/users/repositories/interfaces/IUsersRepository';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import { IUserTokensRepository } from '../repositories/interfaces/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
export class ForgotPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('This user not exist');
    }

    const { token } = await this.userTokensRepository.create(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Geziel] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}
