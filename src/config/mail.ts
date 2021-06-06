// import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
// import { defaults } from '@hapi/joi';

interface IMailDriver {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      name: string;
      email: string;
    };
  };
}

export const mailConfig = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      name: 'Geziel Elyon',
      email: 'gezielelyon@hotmail.com',
    },
  },
} as IMailDriver;
