
import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteEventUseCase } from "./DeleteEventUseCase";

export class DeleteEventController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { eventId } = request.params;
    const { id: userId } = request.user;

    const deleteEventUseCase = container.resolve(DeleteEventUseCase);

    await deleteEventUseCase.execute(eventId, userId);

    return response.status(204).send();
  }
}
