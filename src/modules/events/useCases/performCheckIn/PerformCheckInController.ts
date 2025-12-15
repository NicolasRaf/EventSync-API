import { Request, Response } from "express";
import { container } from "tsyringe";
import { PerformCheckInUseCase } from "./PerformCheckInUseCase";

export class PerformCheckInController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { eventId } = request.params;
    const { participantId } = request.body;

    const performCheckInUseCase = container.resolve(PerformCheckInUseCase);

    const registration = await performCheckInUseCase.execute({
      eventId,
      participantId,
    });

    return response.json(registration);
  }
}
