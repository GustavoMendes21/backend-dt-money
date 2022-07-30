import { Request, Response } from "express";

import { CreateUserUseCase } from "../useCases/CreateUserUseCase";

const createUserUseCase = new CreateUserUseCase();

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    try {
      await createUserUseCase.execute({ name, email, password });
      return response.status(201).json({ name, email, password });
    } catch (error) {
      return response.status(409).json({ erro: error.message });
    }
  }
}

export { CreateUserController };
