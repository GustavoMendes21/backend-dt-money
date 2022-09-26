export interface ITransaction {
  id: string;
  userId: string;
  title: string;
  amount: number;
  category: string;
  type: string;
  transactionDate: Date;
  createdAt: Date;
}

export interface ICreateTransactionDTO {
  userId: string;
  title: string;
  amount: number;
  category: string;
  type: string;
  transactionDate: Date;
}

interface ITransactionsRepository {
  createTransaction({
    category,
    userId,
    title,
    transactionDate,
    amount,
    type,
  }: ICreateTransactionDTO): void;
  findByUserId(userId: string): Promise<ITransaction[]>;
}

export { ITransactionsRepository };
