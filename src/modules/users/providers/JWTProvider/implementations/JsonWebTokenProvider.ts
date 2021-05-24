import { sign, verify } from 'jsonwebtoken';

import AuthConfig from '@config/auth';
import { IJWTProvider } from '../models/IJWTProvider';

class JsonWebTokenProvider implements IJWTProvider {
  public async generate(id: string): Promise<string> {
    const token = await sign({}, AuthConfig.jwt.secret, {
      subject: id,
      expiresIn: AuthConfig.jwt.expiresIn,
    });

    return token;
  }

  public async verify(token: string): Promise<string | unknown> {
    return verify(token, AuthConfig.jwt.secret);
  }
}

export { JsonWebTokenProvider };
