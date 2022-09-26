import { Either, left, right } from "../../../errors/either";
import { ResponseError } from "../../../errors/ResponseError";
import { UsersRepository } from "../../users/repositories/implementations/UsersRepository";
import { TransactionRepository } from "../repositories/implementations/TransactionsRepository";
import { ITransaction } from "../repositories/ITransactionsRepository";

const transactionRepository = new TransactionRepository();
const usersRepository = new UsersRepository();

type Response = Either<ResponseError, ITransaction>;

interface ITransactionParams {
  category: string;
  title: string;
  transactionDate: Date;
  userId: string;
  amount: number;
  type: string;
}

class CreateTransactionsUseCase {
  async execute({
    category,
    title,
    transactionDate,
    userId,
    amount,
    type,
  }: ITransactionParams): Promise<Response> {
    const user = await usersRepository.findByUserId({ id: userId });

    if (!user) {
      return left(new ResponseError("ID do usuário não encontrado", 404));
    }

    const date = new Date(transactionDate);

    const newTransaction = await transactionRepository.createTransaction({
      category,
      title,
      transactionDate: date,
      userId: user.id,
      amount,
      type,
    });

    return right(newTransaction);
  }
}

export { CreateTransactionsUseCase };
