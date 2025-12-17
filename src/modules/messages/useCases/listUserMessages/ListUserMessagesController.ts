import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUserMessagesUseCase } from "./ListUserMessagesUseCase";

export class ListUserMessagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listUserMessagesUseCase = container.resolve(ListUserMessagesUseCase);

    const messages = await listUserMessagesUseCase.execute(id);

    return response.json(messages);
  }
}
