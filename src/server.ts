import express from "express";

import { createConnection } from "../data-source";
import { router } from "./routes";

const app = express();

app.use(express.json());
createConnection();

app.use(router);

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.listen(8080, () => console.log("Server Is Running"));
