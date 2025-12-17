import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendMessageUseCase } from "./SendMessageUseCase";

export class SendMessageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: senderId } = request.user;
    const { receiverId, content } = request.body;

    const sendMessageUseCase = container.resolve(SendMessageUseCase);

    const message = await sendMessageUseCase.execute({
      senderId,
      receiverId,
      content,
    });

    return response.status(201).json(message);
  }
}
