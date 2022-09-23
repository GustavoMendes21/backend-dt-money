import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { ForgotPasswordUserUseCase } from "../useCases/ForgotPasswordUserUseCase";

const forgotPasswordUserUseCase = new ForgotPasswordUserUseCase();

class ForgotPasswordUserController {
  // eslint-disable-next-line consistent-return
  async handle(request: Request, response: Response) {
    const { email } = request.body;
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ InvalidFields: errors.array() });
    }

    try {
      const MessageSuccessOrError = await forgotPasswordUserUseCase.execute({
        email,
      });

      if (MessageSuccessOrError.isLeft()) {
        return response
          .status(MessageSuccessOrError.value.statusCode)
          .json(MessageSuccessOrError.value.message);
      }

      return response.status(201).json(MessageSuccessOrError.value);
    } catch (error) {
      return response.status(500).json("an unexpected error happened");
    }
  }
}

export { ForgotPasswordUserController };
