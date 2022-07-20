interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

interface IUsersRepository {
  create({ email, name, password }: ICreateUserDTO): void;
}

export { IUsersRepository };
