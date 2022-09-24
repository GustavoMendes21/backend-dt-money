export interface ITransaction {
  id: string;
  userId: string;
  title: string;
  value: number;
  category: string;
  transactionDate: Date;
  createdAt: Date;
}

export interface ICreateTransactionDTO {
  userId: string;
  title: string;
  value: number;
  category: string;
  transactionDate: Date;
}

interface ITransactionsRepository {
  createTransaction({
    category,
    userId,
    title,
    transactionDate,
    value,
  }: ICreateTransactionDTO): void;
  findByUserId(userId: string): Promise<ITransaction[]>;
}

export { ITransactionsRepository };
