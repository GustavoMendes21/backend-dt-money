import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UsersRepository } from "../repositories/implementations/UsersRepository";

interface IAuthenticateUserDTO {
  email: string;
  password: string;
}

const userRepository = new UsersRepository();

class AuthenticateUserUseCase {
  async execute({ email, password }: IAuthenticateUserDTO) {
    const user = await userRepository.findByEmail({ email });
    if (!user) {
      throw new Error("Email not found");
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

      return token;
    }
    throw new Error("Password is not correct");
  }
}

export { AuthenticateUserUseCase };
