import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRegistrationUseCase } from "./CreateRegistrationUseCase";
import { z } from "zod";

export class CreateRegistrationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { eventId } = request.params;
    const { id: userId } = request.user;

    const createRegistrationParamsSchema = z.object({
      eventId: z.string().uuid(),
    });

    // Validate eventId is a valid UUID
    createRegistrationParamsSchema.parse({ eventId });

    const createRegistrationUseCase = container.resolve(CreateRegistrationUseCase);

    const registration = await createRegistrationUseCase.execute({
      userId,
      eventId,
    });

    return response.status(201).json(registration);
  }
}
