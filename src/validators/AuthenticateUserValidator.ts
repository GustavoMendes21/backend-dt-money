import { body } from "express-validator";

export const AuthenticateUserValidator = [
  body("email").escape().notEmpty().isEmail().withMessage("Email não é válido"),
  body("password")
    .escape()
    .notEmpty()
    .withMessage("Senha é obrigatório")
    .isLength({ min: 5 })
    .withMessage("Senha deve conter no mínimo 5 caractéres"),
];
