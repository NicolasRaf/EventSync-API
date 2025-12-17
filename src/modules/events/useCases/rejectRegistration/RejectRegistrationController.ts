import { Request, Response } from "express";
import { container } from "tsyringe";
import { RejectRegistrationUseCase } from "./RejectRegistrationUseCase";

export class RejectRegistrationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const { id: registrationId } = request.params;

    const rejectRegistrationUseCase = container.resolve(RejectRegistrationUseCase);

    await rejectRegistrationUseCase.execute({
      registrationId,
      userId,
    });

    return response.status(204).send();
  }
}
