import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { CreateUserUseCase } from "../useCases/CreateUserUseCase";

const createUserUseCase = new CreateUserUseCase();

class CreateUserController {
  async handle(request: Request, response: Response) {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response.status(400).json({ InvalidFields: errors.array() });
      }

      const { name, email, password } = request.body;

      const messageSuccessOrError = await createUserUseCase.execute({
        name,
        email,
        password,
      });

      if (messageSuccessOrError.isLeft()) {
        return response
          .status(messageSuccessOrError.value.statusCode)
          .json(messageSuccessOrError.value.message);
      }

      return response.status(201).json(messageSuccessOrError.value);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }
}

export { CreateUserController };
