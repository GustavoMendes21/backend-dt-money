import { Router } from "express";

import { AuthUser } from "../middleware/AuthUser";

const transactionsRouter = Router();

transactionsRouter.get("/teste", AuthUser, (req, res) => {
  res.json("teste");
});

export { transactionsRouter };
