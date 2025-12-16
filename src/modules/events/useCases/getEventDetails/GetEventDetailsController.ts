import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetEventDetailsUseCase } from "./GetEventDetailsUseCase";

export class GetEventDetailsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { eventId } = request.params;

    const getEventDetailsUseCase = container.resolve(GetEventDetailsUseCase);

    const eventDetails = await getEventDetailsUseCase.execute(eventId);

    return response.json(eventDetails);
  }
}
