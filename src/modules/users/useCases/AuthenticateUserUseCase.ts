import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Either, left, right } from "../../../errors/either";
import { ResponseError } from "../../../errors/ResponseError";
import { UsersRepository } from "../repositories/implementations/UsersRepository";

interface IAuthenticateUserDTO {
  email: string;
  password: string;
}

type AuthenticateUserSuccessfully = string;

type Response = Either<ResponseError, AuthenticateUserSuccessfully>;

const userRepository = new UsersRepository();

class AuthenticateUserUseCase {
  async execute({ email, password }: IAuthenticateUserDTO): Promise<Response> {
    const user = await userRepository.findByEmail({ email });
    if (!user) {
      return left(new ResponseError("E-mail informado não existe", 403));
    }
    const passwordHashed = user.password;
    const passwordIsCorrect = await bcrypt.compare(password, passwordHashed);

    if (passwordIsCorrect) {
      const token = jwt.sign(
        { Email: user.email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "2 days",
        }
      );
      return right(token);
    }

    return left(new ResponseError("Senha incorreta", 403));
  }
}

export { AuthenticateUserUseCase };
