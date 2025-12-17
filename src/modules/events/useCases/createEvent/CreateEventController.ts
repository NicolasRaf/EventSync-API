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
      locationType: z.enum(["ONLINE", "IN_PERSON"]),
      location: z.string().optional(),
      onlineUrl: z.string().url().optional(),
    }).refine((data) => {
      if (data.locationType === "IN_PERSON" && !data.location) {
        return false;
      }
      return true;
    }, {
      message: "Location is required for IN_PERSON events",
      path: ["location"],
    }).refine((data) => {
      if (data.locationType === "ONLINE" && !data.onlineUrl) {
         // Making onlineUrl optional in schema but maybe we want to enforce it? 
         // User prompt said "optional onlineUrl", but "Address... mandatory if IN_PERSON".
         // It didn't explicitly say onlineUrl is mandatory if ONLINE, checking prompt: "Adicione um campo opcional onlineUrl".
         // "Se locationType for ONLINE, address pode ser nulo".
         return true;
      }
      return true;
    });

    const { title, description, date, location, locationType, onlineUrl } = createEventBodySchema.parse(
      request.body
    );

    const { id: organizerId } = request.user;

    const createEventUseCase = container.resolve(CreateEventUseCase);

    const event = await createEventUseCase.execute({
      title,
      description,
      date,
      location,
      locationType,
      onlineUrl,
      organizerId,
    });

    return response.status(201).json(event);
  }
}
