import { Either, left, right } from "../../../errors/either";
import { ResponseError } from "../../../errors/ResponseError";
import { UsersRepository } from "../../users/repositories/implementations/UsersRepository";
import { TransactionRepository } from "../repositories/implementations/TransactionsRepository";

const transactionRepository = new TransactionRepository();
const usersRepository = new UsersRepository();

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
    const user = await usersRepository.findByUserId({ id: userId });

    if (!user) {
      return left(new ResponseError("ID do usuário não encontrado", 404));
    }

    const date = new Date(transactionDate);

    await transactionRepository.createTransaction({
      category,
      title,
      transactionDate: date,
      userId: user.id,
      value,
    });

    return right("Transaction Created");
  }
}

export { CreateTransactionsUseCase };
