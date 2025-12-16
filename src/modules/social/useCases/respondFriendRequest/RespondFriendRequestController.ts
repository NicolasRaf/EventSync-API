import { Request, Response } from "express";
import { container } from "tsyringe";
import { RespondFriendRequestUseCase } from "./RespondFriendRequestUseCase";

export class RespondFriendRequestController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const { requestId } = request.params;
    const { accept } = request.body;

    const respondFriendRequestUseCase = container.resolve(RespondFriendRequestUseCase);

    const friendship = await respondFriendRequestUseCase.execute({
      userId,
      requestId,
      accept,
    });

    return response.json(friendship);
  }
}
