import { Router } from "express";

import { AuthenticateUserController } from "../modules/users/controllers/AuthenticateUserController";
import { CreateUserController } from "../modules/users/controllers/CreateUserController";
import { ForgotPasswordUserController } from "../modules/users/controllers/ForgotPasswordUserController";
import { RecoveryPasswordUserController } from "../modules/users/controllers/RecoveryPasswordUserController";
import { AuthenticateUserValidator } from "../validators/AuthenticateUserValidator";
import { CreateUserValidator } from "../validators/CreateUserValidator";
import { ForgotPasswordValidator } from "../validators/ForgotPasswordUserController";
import { RecoveryPasswordValidator } from "../validators/RecoveryPasswordValidator";

const usersRouter = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const forgotPasswordUserController = new ForgotPasswordUserController();
const recoveryPasswordUserController = new RecoveryPasswordUserController();

usersRouter.post("/create", CreateUserValidator, createUserController.handle);
usersRouter.post(
  "/auth",
  AuthenticateUserValidator,
  authenticateUserController.handle
);

usersRouter.post(
  "/auth/forgotPassword",
  ForgotPasswordValidator,
  forgotPasswordUserController.handle
);

usersRouter.post(
  "/auth/RecoveryPassword",
  RecoveryPasswordValidator,
  recoveryPasswordUserController.handle
);

export { usersRouter };
