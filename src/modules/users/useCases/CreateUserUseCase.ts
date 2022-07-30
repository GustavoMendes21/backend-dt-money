import bcrypt from "bcrypt";

import { UsersRepository } from "../repositories/implementations/UsersRepository";

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

const userRepository = new UsersRepository();

class CreateUserUseCase {
  async execute({ name, email, password }: ICreateUserDTO) {
    const user = await userRepository.findByEmail({ email });

    if (user) {
      throw new Error("A user with that email already exists");
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    await userRepository.create({ name, email, password: hashPassword });
  }
}

export { CreateUserUseCase };
