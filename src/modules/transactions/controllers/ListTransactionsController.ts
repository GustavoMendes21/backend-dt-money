import { Request, Response } from "express";

import { ListTransactionUseCase } from "../useCases/ListTransactionsUseCase";

const listTransactionsUseCase = new ListTransactionUseCase();

class ListTransactionsController {
  async handle(request: Request, response: Response) {
    const { userId } = request.body;

    try {
      const TransactionsOrError = await listTransactionsUseCase.execute({
        userId,
      });

      if (TransactionsOrError.isLeft()) {
        return response
          .status(TransactionsOrError.value.statusCode)
          .json(TransactionsOrError.value.message);
      }

      return response.status(200).json(TransactionsOrError.value);
    } catch (error) {
      return response.status(500).json("an unexpected error occurred");
    }
  }
}

export { ListTransactionsController };
