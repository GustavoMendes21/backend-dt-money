import { Request, Response } from "express";

import { ForgotPasswordUserUseCase } from "../useCases/ForgotPasswordUserUseCase";

const forgotPasswordUserUseCase = new ForgotPasswordUserUseCase();

class ForgotPasswordUserController {
  // eslint-disable-next-line consistent-return
  async handle(request: Request, response: Response) {
    const { email } = request.body;
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
