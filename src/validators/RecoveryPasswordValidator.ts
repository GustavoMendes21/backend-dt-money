import { body } from "express-validator";

export const RecoveryPasswordValidator = [
  body("email").escape().notEmpty().isEmail().withMessage("Email não é válido"),
  body("newPassword")
    .escape()
    .notEmpty()
    .withMessage("Senha é obrigatório")
    .isLength({ min: 5 })
    .withMessage("Senha deve conter no mínimo 5 caractéres"),
  body("token").escape().notEmpty().withMessage("Token é obrigatório"),
];
