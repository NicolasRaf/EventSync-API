import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUserRegistrationsUseCase } from "./ListUserRegistrationsUseCase";

export class ListUserRegistrationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;

    const listUserRegistrationsUseCase = container.resolve(
      ListUserRegistrationsUseCase
    );

    const registrations = await listUserRegistrationsUseCase.execute(userId);

    return response.json(registrations);
  }
}
