import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const token = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return response.json(token);
  }
}
