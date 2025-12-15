import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import { CreateEventUseCase } from "./CreateEventUseCase";

export class CreateEventController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createEventBodySchema = z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      location: z.string(),
    });

    const { title, description, date, location } = createEventBodySchema.parse(
      request.body
    );

    const { id: organizerId } = request.user;

    const createEventUseCase = container.resolve(CreateEventUseCase);

    const event = await createEventUseCase.execute({
      title,
      description,
      date,
      location,
      organizerId,
    });

    return response.status(201).json(event);
  }
}
