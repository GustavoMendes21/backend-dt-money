import { Router } from "express";
import { AuthenticateUserController } from "../modules/users/controllers/AuthenticateUserController";

import { CreateUserController } from "../modules/users/controllers/createUserController";
import { CreateUserValidator } from "../validators/CreateUserValidator";

const usersRouter = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController()

usersRouter.post("/create", CreateUserValidator, createUserController.handle);
usersRouter.post("/auth", authenticateUserController.handle)

export { usersRouter };
