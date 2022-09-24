import { Repository } from "typeorm";

import { AppDataSource } from "../../../../../data-source";
import { Transaction } from "../../entities/Transactions";
import {
  ICreateTransactionDTO,
  ITransaction,
  // eslint-disable-next-line prettier/prettier
  ITransactionsRepository
} from "../ITransactionsRepository";

class TransactionRepository implements ITransactionsRepository {
  private repository: Repository<Transaction>;

  constructor() {
    this.repository = AppDataSource.getRepository(Transaction);
  }

  async createTransaction({
    category,
    userId,
    title,
    transactionDate,
    amount,
    type,
  }: ICreateTransactionDTO): Promise<void> {
    const transaction = this.repository.create({
      userId,
      amount,
      category,
      title,
      transactionDate,
      type,
    });

    await this.repository.save(transaction);
  }

  async findByUserId(userId: string): Promise<ITransaction[]> {
    const transactions = this.repository.find({
      where: {
        userId,
      },
    });

    if (!transactions) {
      return null;
    }

    return transactions;
  }
}

export { TransactionRepository };
