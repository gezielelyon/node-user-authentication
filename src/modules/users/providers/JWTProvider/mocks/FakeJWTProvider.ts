import { IJWTProvider } from '../models/IJWTProvider';

class FakeJWTProvider implements IJWTProvider {
  public async generate(id: string): Promise<string> {
    return id;
  }

  public async verify(token: string): Promise<string | unknown> {
    return token;
  }
}

export { FakeJWTProvider };
