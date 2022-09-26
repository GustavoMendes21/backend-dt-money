import { Either, left, right } from "../../../errors/either";
import { ResponseError } from "../../../errors/ResponseError";
import { UsersRepository } from "../../users/repositories/implementations/UsersRepository";
import { Transaction } from "../entities/Transactions";
import { TransactionRepository } from "../repositories/implementations/TransactionsRepository";

interface IListTransactionsUseCase {
  userId: string;
}

type Response = Either<ResponseError, Transaction[]>;

const transactionsRepository = new TransactionRepository();
const usersRepository = new UsersRepository();

class ListTransactionUseCase {
  async execute({ userId }: IListTransactionsUseCase): Promise<Response> {
    const user = await usersRepository.findByUserId({ id: userId });
    if (!user) {
      return left(new ResponseError("ID do usuário não encontrado", 404));
    }

    const transactions = await transactionsRepository.findByUserId(user.id);

    if (!transactions) {
      return left(new ResponseError("Nenhuma transação encontrada", 404));
    }

    return right(transactions);
  }
}

export { ListTransactionUseCase };
