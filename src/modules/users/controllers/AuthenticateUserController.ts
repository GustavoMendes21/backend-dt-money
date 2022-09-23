import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { AuthenticateUserUseCase } from "../useCases/AuthenticateUserUseCase";

const authenticateUserUseCase = new AuthenticateUserUseCase();

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ InvalidFields: errors.array() });
    }

    try {
      const { email, password } = request.body;
      const tokenOrError = await authenticateUserUseCase.execute({
        email,
        password,
      });

      if (tokenOrError.isLeft()) {
        return response
          .status(tokenOrError.value.statusCode)
          .json(tokenOrError.value.message);
      }

      return response.status(201).json(tokenOrError.value);
    } catch (error) {
      return response.status(500).json("an unexpected error happened");
    }
  }
}

export { AuthenticateUserController };
