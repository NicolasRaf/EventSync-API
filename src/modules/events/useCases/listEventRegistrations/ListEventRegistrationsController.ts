import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListEventRegistrationsUseCase } from "./ListEventRegistrationsUseCase";

export class ListEventRegistrationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { eventId } = request.params;

    const listEventRegistrationsUseCase = container.resolve(
      ListEventRegistrationsUseCase
    );

    const registrations = await listEventRegistrationsUseCase.execute(eventId);

    return response.json(registrations);
  }
}
