import bcrypt from "bcrypt";

import { Either, left, right } from "../../../errors/either";
import { ResponseError } from "../../../errors/ResponseError";
import { UsersRepository } from "../repositories/implementations/UsersRepository";

interface IRecoveryPasswordUserUseCaseDTO {
  email: string;
  token: string;
  newPassword: string;
}

type RecoveryPasswordSuccessfully = string;
type Response = Either<ResponseError, RecoveryPasswordSuccessfully>;
const userRepository = new UsersRepository();

class RecoveryPasswordUserUseCase {
  async execute({
    email,
    token,
    newPassword,
  }: IRecoveryPasswordUserUseCaseDTO): Promise<Response> {
    const user = await userRepository.findByEmail({ email });

    if (!user) {
      return left(new ResponseError("E-mail informado não existe", 403));
    }

    const now = new Date();

    if (user.passwordResetToken !== token || now > user.passwordResetExpires) {
      return left(new ResponseError("O Token não é válido ou já expirou", 403));
    }

    const hashPassword = bcrypt.hashSync(newPassword, 10);

    user.password = hashPassword;

    try {
      await userRepository.updateUser(user);
      return right("Senha alterada com sucesso");
    } catch (error) {
      return left(new ResponseError("an unexpected error happened"));
    }
  }
}

export { RecoveryPasswordUserUseCase };
