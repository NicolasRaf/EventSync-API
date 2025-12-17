import { Request, Response } from "express";
import { container } from "tsyringe";
import { CancelRegistrationUseCase } from "./CancelRegistrationUseCase";

export class CancelRegistrationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const { id: registrationId } = request.params;

    const cancelRegistrationUseCase = container.resolve(CancelRegistrationUseCase);

    await cancelRegistrationUseCase.execute({
      userId,
      registrationId,
    });

    return response.status(204).send();
  }
}
