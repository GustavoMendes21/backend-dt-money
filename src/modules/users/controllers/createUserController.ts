import { Request, Response } from "express";

import { CreateUserUseCase } from "../useCases/CreateUserUseCase";

const createUserUseCase = new CreateUserUseCase();

class CreateUserController {
  handle(request: Request, response: Response) {
    const { name, email, password } = request.body;
    createUserUseCase.execute({ name, email, password });

    return response.status(201).send();
  }
}

export { CreateUserController };
