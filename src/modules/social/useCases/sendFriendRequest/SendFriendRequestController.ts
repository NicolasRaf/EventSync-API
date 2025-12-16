import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendFriendRequestUseCase } from "./SendFriendRequestUseCase";

export class SendFriendRequestController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: addresseeId } = request.params;
    const { id: requesterId } = request.user;

    const sendFriendRequestUseCase = container.resolve(SendFriendRequestUseCase);

    const friendship = await sendFriendRequestUseCase.execute({
      requesterId,
      addresseeId,
    });

    return response.status(201).json(friendship);
  }
}
