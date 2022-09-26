import { Request, Response } from "express";

import { CreateTransactionsUseCase } from "../useCases/CreateTransactionUseCase";

const createTransactionsUseCase = new CreateTransactionsUseCase();

class CreateTransactionController {
  async handle(request: Request, response: Response) {
    const { userId, title, amount, type, category, transactionDate } =
      request.body;

    try {
      const TransactionOrError = await createTransactionsUseCase.execute({
        userId,
        title,
        amount,
        type,
        category,
        transactionDate,
      });

      if (TransactionOrError.isLeft()) {
        return response
          .status(TransactionOrError.value.statusCode)
          .json(TransactionOrError.value.message);
      }

      return response.status(200).json(TransactionOrError.value);
    } catch (error) {
      return response.status(500).json("An unexpected error happened");
    }
  }
}

export { CreateTransactionController };
