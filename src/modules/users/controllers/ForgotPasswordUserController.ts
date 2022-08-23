import { Request, Response } from "express";

import { ForgotPasswordUserUseCase } from "../useCases/ForgotPasswordUserUseCase";

const forgotPasswordUserUseCase = new ForgotPasswordUserUseCase();

class ForgotPasswordUserController {
  // eslint-disable-next-line consistent-return
  async handle(request: Request, response: Response) {
    const { email } = request.body;

    try {
      await forgotPasswordUserUseCase.execute({ email });
      return response.status(201).json({ message: "Token Enviado" });
    } catch (error) {
      response.status(404).json({ erro: error.message });
    }
  }
}

export { ForgotPasswordUserController };
