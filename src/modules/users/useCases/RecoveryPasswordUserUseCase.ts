import bcrypt from "bcrypt";

import { UsersRepository } from "../repositories/implementations/UsersRepository";

interface IRecoveryPasswordUserUseCaseDTO {
  email: string;
  token: string;
  newPassword: string;
}

const userRepository = new UsersRepository();

class RecoveryPasswordUserUseCase {
  async execute({
    email,
    token,
    newPassword,
  }: IRecoveryPasswordUserUseCaseDTO) {
    const user = await userRepository.findByEmail({ email });

    if (!user) {
      throw new Error("Email is not exists");
    }

    const now = new Date();

    if (user.passwordResetToken !== token || now > user.passwordResetExpires) {
      throw new Error("Token not is valid");
    }

    const hashPassword = bcrypt.hashSync(newPassword, 10);

    user.password = hashPassword;

    try {
      await userRepository.updateUser(user);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { RecoveryPasswordUserUseCase };
