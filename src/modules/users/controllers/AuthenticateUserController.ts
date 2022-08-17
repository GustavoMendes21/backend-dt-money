import { Request, Response } from "express";

import { AuthenticateUserUseCase } from "../useCases/AuthenticateUserUseCase";

const authenticateUserUseCase = new AuthenticateUserUseCase();

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;
    try {
      const token = await authenticateUserUseCase.execute({ email, password });
      response.status(201).json({ token });
    } catch (error) {
      response.status(400).json({ error });
    }
  }
}

export { AuthenticateUserController };
