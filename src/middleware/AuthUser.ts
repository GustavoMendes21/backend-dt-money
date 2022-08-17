import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

function AuthUser(request: Request, response: Response, next: NextFunction) {
  const token = request.headers.authorization.split(" ")[1];

  if (!token) {
    return response.status(401).json({ Message: "Token is not exists" });
  }

  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    request.UserAuthenticated = { Auth: true, Name: tokenDecoded };
    next();
  } catch (error) {
    return response.status(401).json({ Message: "Token is not valid " });
  }
}

export { AuthUser };
