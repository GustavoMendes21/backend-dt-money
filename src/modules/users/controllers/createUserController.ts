import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { CreateUserUseCase } from "../useCases/CreateUserUseCase";

const createUserUseCase = new CreateUserUseCase();

class CreateUserController {
  async handle(request: Request, response: Response) {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ InvalidFields: errors.array() });
    }

    const { name, email, password } = request.body;

    try {
      await createUserUseCase.execute({ name, email, password });
      return response.status(201).json({ name, email });
    } catch (error) {
      return response.status(409).json({ erro: error.message });
    }
  }
}

export { CreateUserController };
