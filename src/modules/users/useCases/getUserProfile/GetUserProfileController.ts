import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetUserProfileUseCase } from "./GetUserProfileUseCase";

export class GetUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const getUserProfileUseCase = container.resolve(GetUserProfileUseCase);

    const user = await getUserProfileUseCase.execute(id);

    return response.json(user);
  }
}
