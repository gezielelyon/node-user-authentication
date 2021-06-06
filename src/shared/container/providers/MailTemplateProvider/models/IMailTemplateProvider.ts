import { IParseMailTemplateDTO } from '../dtos/IParseMailTemplateDTO';

export interface IMailTemplateProvider {
  parse(date: IParseMailTemplateDTO): Promise<string>;
}
