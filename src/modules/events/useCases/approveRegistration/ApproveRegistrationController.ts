import { Request, Response } from "express";
import { container } from "tsyringe";
import { ApproveRegistrationUseCase } from "./ApproveRegistrationUseCase";

export class ApproveRegistrationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const { id: registrationId } = request.params;

    const approveRegistrationUseCase = container.resolve(ApproveRegistrationUseCase);

    await approveRegistrationUseCase.execute({
      registrationId,
      userId,
    });

    return response.status(204).send();
  }
}
