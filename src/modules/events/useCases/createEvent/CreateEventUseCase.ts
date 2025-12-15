import { inject, injectable } from "tsyringe";
import { IEventsRepository } from "../../repositories/IEventsRepository";
import { Event } from "@prisma/client";

interface ICreateEventRequest {
  title: string;
  description: string;
  date: Date;
  location: string;
  organizerId: string;
}

@injectable()
export class CreateEventUseCase {
  constructor(
    @inject("EventsRepository")
    private eventsRepository: IEventsRepository
  ) {}

  async execute({
    title,
    description,
    date,
    location,
    organizerId,
  }: ICreateEventRequest): Promise<Event> {
    const event = await this.eventsRepository.create({
      title,
      description,
      date,
      location,
      organizer: {
        connect: {
          id: organizerId,
        },
      },
    });

    return event;
  }
}
