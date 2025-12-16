import { inject, injectable } from "tsyringe";
import { Registration } from "@prisma/client";
import { IEventsRepository } from "../../repositories/IEventsRepository";

@injectable()
export class ListUserRegistrationsUseCase {
  constructor(
    @inject("EventsRepository")
    private eventsRepository: IEventsRepository
  ) {}

  async execute(userId: string): Promise<Registration[]> {
    const registrations = await this.eventsRepository.findRegistrationsByUserId(
      userId
    );

    return registrations;
  }
}
