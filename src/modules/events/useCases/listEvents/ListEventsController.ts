import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListEventsUseCase } from "./ListEventsUseCase";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export class ListEventsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listEventsUseCase = container.resolve(ListEventsUseCase);

    let userId: string | undefined;
    const authHeader = request.headers.authorization;

    if (authHeader) {
      const [, token] = authHeader.split(" ");
      try {
        const { sub } = verify(token, process.env.JWT_SECRET || "default_secret") as IPayload;
        userId = sub;
      } catch {
        // Token invalid, ignore
      }
    }

    const events = await listEventsUseCase.execute(userId);

    return response.json(events);
  }
}
