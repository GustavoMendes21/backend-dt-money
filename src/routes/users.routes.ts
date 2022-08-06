import { Router } from "express";

import { CreateUserController } from "../modules/users/controllers/createUserController";
import { CreateUserValidator } from "../validators/CreateUserValidator";

const usersRouter = Router();

const createUserController = new CreateUserController();

usersRouter.post("/create", CreateUserValidator, createUserController.handle);

export { usersRouter };
