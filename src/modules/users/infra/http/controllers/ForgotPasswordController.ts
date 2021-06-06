import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ForgotPasswordService } from '@modules/users/services/ForgotPasswordService';

class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const forgotPasswordServiceInstance = container.resolve(
      ForgotPasswordService,
    );

    await forgotPasswordServiceInstance.execute({ email });

    return response.status(200);
  }
}

const newForgotPasswordController = new ForgotPasswordController();

export { newForgotPasswordController as ForgotPasswordController };
