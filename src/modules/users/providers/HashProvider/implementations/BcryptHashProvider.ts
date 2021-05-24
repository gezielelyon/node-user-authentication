import { hash, compare } from 'bcrypt';

import { IHashProvider } from '../models/IHashProvider';

class BcryptHashProvider implements IHashProvider {
  public async generate(payload: string): Promise<string> {
    const passwordHashed = await hash(payload, 8);

    return passwordHashed;
  }

  public async compare(payload: string, hashed: string): Promise<boolean> {
    const passwordMatched = await compare(payload, hashed);

    return passwordMatched;
  }
}

export { BcryptHashProvider };
