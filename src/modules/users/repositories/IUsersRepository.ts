import { User } from "../entities/User";

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

interface IFindByEmailDTO {
  email: string;
}

interface IFindByUserId {
  id: string;
}

interface IUsersRepository {
  create({ email, name, password }: ICreateUserDTO): void;
  findByEmail({ email }: IFindByEmailDTO): Promise<User>;
  findByUserId({ id }: IFindByUserId): Promise<User>;
}

export { IUsersRepository };
