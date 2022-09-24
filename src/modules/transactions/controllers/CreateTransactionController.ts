import { Request, Response } from "express";

import { CreateTransactionsUseCase } from "../useCases/CreateTransactionUseCase";

const createTransactionsUseCase = new CreateTransactionsUseCase();

class CreateTransactionController {
  async handle(request: Request, response: Response) {
    const { userId, title, value, category, transactionDate } = request.body;

    try {
      const messageSuccessOrError = await createTransactionsUseCase.execute({
        userId,
        title,
        value,
        category,
        transactionDate,
      });

      if (messageSuccessOrError.isLeft()) {
        return response
          .status(messageSuccessOrError.value.statusCode)
          .json(messageSuccessOrError.value.message);
      }

      return response.status(200).json("Transação criada com sucesso");
    } catch (error) {
      return response.status(500).json("An unexpected error happened");
    }
  }
}

export { CreateTransactionController };
