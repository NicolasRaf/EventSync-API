import { inject, injectable } from "tsyringe";
import { IEventsRepository } from "../../repositories/IEventsRepository";
import { Event } from "@prisma/client";

@injectable()
export class ListEventsUseCase {
  constructor(
    @inject("EventsRepository")
    private eventsRepository: IEventsRepository
  ) {}

  async execute(): Promise<Event[]> {
    const events = await this.eventsRepository.listAll();
    return events;
  }
}
