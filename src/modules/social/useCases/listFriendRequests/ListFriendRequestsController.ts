import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListFriendRequestsUseCase } from "./ListFriendRequestsUseCase";

export class ListFriendRequestsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listFriendRequestsUseCase = container.resolve(ListFriendRequestsUseCase);

    const requests = await listFriendRequestsUseCase.execute(id);

    return response.json(requests);
  }
}
