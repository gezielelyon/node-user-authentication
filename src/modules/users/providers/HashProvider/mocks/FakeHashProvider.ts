import { IHashProvider } from '../models/IHashProvider';

class FakeHashProvider implements IHashProvider {
  public async generate(payload: string): Promise<string> {
    return payload;
  }

  public async compare(pauload: string, hashed: string): Promise<boolean> {
    return pauload === hashed;
  }
}

export { FakeHashProvider };
