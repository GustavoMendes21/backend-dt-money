import { Either, right } from "../../../errors/either";
import { ResponseError } from "../../../errors/ResponseError";
import { TransactionRepository } from "../repositories/implementations/TransactionsRepository";

const transactionRepository = new TransactionRepository();

type TransactionSuccessfully = string;

type Response = Either<ResponseError, TransactionSuccessfully>;

interface ITransactionParams {
  category: string;
  title: string;
  transactionDate: Date;
  userId: string;
  value: number;
}

class CreateTransactionsUseCase {
  async execute({
    category,
    title,
    transactionDate,
    userId,
    value,
  }: ITransactionParams): Promise<Response> {
    const date = new Date(transactionDate);

    await transactionRepository.createTransaction({
      category,
      title,
      transactionDate: date,
      userId,
      value,
    });

    return right("Transaction Created");
  }
}

export { CreateTransactionsUseCase };
