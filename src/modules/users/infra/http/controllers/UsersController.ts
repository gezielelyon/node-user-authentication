import { Request, Response } from 'express';

class UsersController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    return response.json({ name, email, password });
  }
}

const newUsersController = new UsersController();

export { newUsersController as UsersController };
