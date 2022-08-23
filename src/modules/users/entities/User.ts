import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  // eslint-disable-next-line prettier/prettier
  UpdateDateColumn
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("users")
export class User {
  constructor() {
    this.id = uuidv4();
  }

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date;

  @Column({ nullable: true })
  passwordResetToken: string | null;

  @Column({ nullable: true })
  passwordResetExpires: Date | null;
}
