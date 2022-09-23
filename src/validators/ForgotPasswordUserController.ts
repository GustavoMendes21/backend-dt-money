import { body } from "express-validator";

export const ForgotPasswordValidator = [
  body("email").escape().notEmpty().isEmail().withMessage("Email não é válido"),
];
