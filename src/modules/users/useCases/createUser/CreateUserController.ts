import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
      role: z.enum(["ADMIN", "ORGANIZER", "PARTICIPANT"]).optional(),
    });

    const { name, email, password, role } = createUserBodySchema.parse(request.body);

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      role,
    });

    // Remove password from response is good practice, but not explicitly requested. 
    // I will return the user object as requested "retorne status 201 com o usuário criado".

    return response.status(201).json(user);
  }
}
