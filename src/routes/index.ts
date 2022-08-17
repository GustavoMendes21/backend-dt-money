import { Router } from "express";

import { transactionsRouter } from "./transactions.routes";
import { usersRouter } from "./users.routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/transactions", transactionsRouter);

export { router };
