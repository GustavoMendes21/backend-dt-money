import { Router } from "express";

import { AuthenticateUserController } from "../modules/users/controllers/AuthenticateUserController";
import { CreateUserController } from "../modules/users/controllers/createUserController";
import { ForgotPasswordUserController } from "../modules/users/controllers/ForgotPasswordUserController";
import { CreateUserValidator } from "../validators/CreateUserValidator";

const usersRouter = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const forgotPasswordUserController = new ForgotPasswordUserController();

usersRouter.post("/create", CreateUserValidator, createUserController.handle);
usersRouter.post("/auth", authenticateUserController.handle);
usersRouter.post("/auth/forgotPassword", forgotPasswordUserController.handle);

export { usersRouter };
