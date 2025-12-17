
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import { UpdateEventUseCase } from "./UpdateEventUseCase";

export class UpdateEventController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { eventId } = request.params;
    const { id: userId } = request.user;

    const updateEventBodySchema = z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      date: z.coerce.date().optional(),
      locationType: z.enum(["ONLINE", "IN_PERSON"]).optional(),
      location: z.string().optional(),
      onlineUrl: z.string().url().optional(),
    }).refine((data) => {
      // If locationType is being updated to IN_PERSON, location must be present OR already exist (we don't check already exist here easily)
      // If the user sends locationType=IN_PERSON, they SHOULD send location.
      if (data.locationType === "IN_PERSON" && !data.location) {
        return false;
      }
      return true;
    }, {
      message: "Location is required when changing to IN_PERSON",
      path: ["location"],
    });

    const data = updateEventBodySchema.parse(request.body);

    const updateEventUseCase = container.resolve(UpdateEventUseCase);

    const event = await updateEventUseCase.execute({
      id: eventId,
      userId,
      data,
    });

    return response.json(event);
  }
}
