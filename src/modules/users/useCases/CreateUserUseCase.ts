import bcrypt from "bcrypt";

import { Either, left, right } from "../../../errors/either";
import { ResponseError } from "../../../errors/ResponseError";
import { UsersRepository } from "../repositories/implementations/UsersRepository";

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

type UserCreatedSuccessfully = string;

type Response = Either<ResponseError, UserCreatedSuccessfully>;

const userRepository = new UsersRepository();

class CreateUserUseCase {
  async execute({ name, email, password }: ICreateUserDTO): Promise<Response> {
    const user = await userRepository.findByEmail({ email });

    if (user) {
      return left(new ResponseError("O e-mail informado já existe", 409));
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    await userRepository.create({ name, email, password: hashPassword });

    return right("Usuário criado com sucesso");
  }
}

export { CreateUserUseCase };
