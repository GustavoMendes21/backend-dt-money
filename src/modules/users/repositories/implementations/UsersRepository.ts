import { Repository } from "typeorm";

import { AppDataSource } from "../../../../../data-source";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

interface IFindByEmailDTO {
  email: string;
}

interface IUpdateUserByEmail {
  id: string;
  name: string;
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
}

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;
  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({ email, name, password }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({ email, name, password });

    await this.repository.save(user);
  }

  async findByEmail({ email }: IFindByEmailDTO): Promise<User> {
    const user = await this.repository.findOneBy({
      email,
    });
    return user;
  }

  async findByUserId({ id }) {
    if (id !== undefined) {
      const user = await this.repository.findOneBy({ id });
      return user;
    }

    return null;
  }

  async updateUser({
    id,
    email,
    name,
    password,
    passwordResetExpires,
    passwordResetToken,
  }: IUpdateUserByEmail): Promise<void> {
    await this.repository.save({
      id,
      email,
      name,
      password,
      passwordResetExpires,
      passwordResetToken,
    });
  }
}
