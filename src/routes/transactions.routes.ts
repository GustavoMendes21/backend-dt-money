import { Router } from "express";

import { AuthUser } from "../middleware/AuthUser";
import { CreateTransactionController } from "../modules/transactions/controllers/CreateTransactionController";
import { ListTransactionsController } from "../modules/transactions/controllers/ListTransactionsController";

const transactionsRouter = Router();

const createTransactionController = new CreateTransactionController();
const listTransactionController = new ListTransactionsController();

transactionsRouter.post(
  "/create",
  AuthUser,
  createTransactionController.handle
);

transactionsRouter.post(
  "/listByUserId",
  AuthUser,
  listTransactionController.handle
);

export { transactionsRouter };
