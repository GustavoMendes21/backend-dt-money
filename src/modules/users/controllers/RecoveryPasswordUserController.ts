import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { RecoveryPasswordUserUseCase } from "../useCases/RecoveryPasswordUserUseCase";

const recoveryPasswordUseCase = new RecoveryPasswordUserUseCase();

class RecoveryPasswordUserController {
  async handle(request: Request, response: Response) {
    const { email, token, newPassword } = request.body;
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ InvalidFields: errors.array() });
    }

    try {
      const MessageSuccessOrError = await recoveryPasswordUseCase.execute({
        email,
        token,
        newPassword,
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

export { RecoveryPasswordUserController };
