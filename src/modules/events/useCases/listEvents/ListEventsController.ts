import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListEventsUseCase } from "./ListEventsUseCase";

export class ListEventsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listEventsUseCase = container.resolve(ListEventsUseCase);

    const events = await listEventsUseCase.execute();

    return response.json(events);
  }
}
