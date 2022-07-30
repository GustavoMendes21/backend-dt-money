import { UsersRepository } from "../repositories/implementations/UsersRepository";

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

const userRepository = new UsersRepository();

class CreateUserUseCase {
  execute({ name, email, password }: ICreateUserDTO) {
    userRepository.create({ name, email, password });
  }
}

export { CreateUserUseCase };
