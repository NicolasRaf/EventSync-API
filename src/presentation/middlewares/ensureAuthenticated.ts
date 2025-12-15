import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "Token missing" });
  }

  // Bearer <token>
  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    ) as IPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    return response.status(401).json({ message: "Invalid token" });
  }
}
