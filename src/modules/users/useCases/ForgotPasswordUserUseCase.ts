import crypto from "node:crypto";

import { Either, left, right } from "../../../errors/either";
import { ResponseError } from "../../../errors/ResponseError";
import { sendMailForgotPassword } from "../../../utils/mail/sendEmailForgotPassword";
import { UsersRepository } from "../repositories/implementations/UsersRepository";

interface IForgotPasswordUserDTO {
  email: string;
}

type ForgotPasswordUserSuccessfuly = string;

type Response = Either<ResponseError, ForgotPasswordUserSuccessfuly>;

const userRepository = new UsersRepository();

class ForgotPasswordUserUseCase {
  async execute({ email }: IForgotPasswordUserDTO): Promise<Response> {
    const user = await userRepository.findByEmail({ email });

    if (!user) {
      return left(new ResponseError("E-mail informado não existe", 404));
    }

    const token = crypto.randomBytes(20).toString("hex");

    const tokenExpiresIn = new Date();
    tokenExpiresIn.setHours(tokenExpiresIn.getHours() + 1);

    user.passwordResetToken = token;
    user.passwordResetExpires = tokenExpiresIn;

    try {
      await userRepository.updateUser(user);
    } catch (erro) {
      return left(new ResponseError("an unexpected error happened"));
    }

    await sendMailForgotPassword({ email: user.email, token });
    return right("Um token foi enviado ao respectivo e-mail");
  }
}

export { ForgotPasswordUserUseCase };
