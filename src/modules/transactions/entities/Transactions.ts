import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("transactions")
export class Transaction {
  constructor() {
    this.id = uuidv4();
  }
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  title: string;

  @Column()
  amount: number;

  @Column()
  type: string;

  @Column()
  category: string;

  @Column()
  transactionDate: Date;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;
}
