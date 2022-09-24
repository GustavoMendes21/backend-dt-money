import { Router } from "express";

import { AuthUser } from "../middleware/AuthUser";
import { CreateTransactionController } from "../modules/transactions/controllers/CreateTransactionController";

const transactionsRouter = Router();

const createTransactionController = new CreateTransactionController();

transactionsRouter.get("/create", AuthUser, createTransactionController.handle);

export { transactionsRouter };
