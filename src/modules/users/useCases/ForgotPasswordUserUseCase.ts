import crypto from "node:crypto";

import { sendMailForgotPassword } from "../../../utils/mail/sendEmailForgotPassword";
import { UsersRepository } from "../repositories/implementations/UsersRepository";

interface IForgotPasswordUserDTO {
  email: string;
}

const userRepository = new UsersRepository();

class ForgotPasswordUserUseCase {
  async execute({ email }: IForgotPasswordUserDTO) {
    const user = await userRepository.findByEmail({ email });

    if (!user) {
      throw new Error("Email not exists");
    }

    const token = crypto.randomBytes(20).toString("hex");

    const tokenExpiresIn = new Date();
    tokenExpiresIn.setHours(tokenExpiresIn.getHours() + 1);

    user.passwordResetToken = token;
    user.passwordResetExpires = tokenExpiresIn;

    try {
      await userRepository.updateUser(user);
    } catch (erro) {
      throw new Error(erro);
    }

    await sendMailForgotPassword({ email: user.email, token });
  }
}

export { ForgotPasswordUserUseCase };
