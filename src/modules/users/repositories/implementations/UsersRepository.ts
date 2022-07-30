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

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;
  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  create({ email, name, password }: ICreateUserDTO): void {
    const user = this.repository.create({ email, name, password });

    this.repository.save(user);
  }

  findByEmail({ email }: IFindByEmailDTO): Promise<User> {
    const user = this.repository.findOne({ where: { email } });
    return user;
  }
}
