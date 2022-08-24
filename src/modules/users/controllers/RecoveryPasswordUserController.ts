import { Request, Response } from "express";

import { RecoveryPasswordUserUseCase } from "../useCases/RecoveryPasswordUserUseCase";

const recoveryPasswordUseCase = new RecoveryPasswordUserUseCase();

class RecoveryPasswordUserController {
  async handle(request: Request, response: Response) {
    const { email, token, newPassword } = request.body;

    try {
      await recoveryPasswordUseCase.execute({ email, token, newPassword });
      response.status(201).json({ message: "Password Updated" });
    } catch (error) {
      response.status(401).json({ erro: error.message });
    }
  }
}

export { RecoveryPasswordUserController };
