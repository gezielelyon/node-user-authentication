export interface IJWTProvider {
  generate(id: string): Promise<string>;
  verify(token: string): Promise<string | unknown>;
}
