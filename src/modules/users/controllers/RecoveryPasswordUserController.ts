import { Request, Response } from "express";

import { RecoveryPasswordUserUseCase } from "../useCases/RecoveryPasswordUserUseCase";

const recoveryPasswordUseCase = new RecoveryPasswordUserUseCase();

class RecoveryPasswordUserController {
  async handle(request: Request, response: Response) {
    const { email, token, newPassword } = request.body;

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
