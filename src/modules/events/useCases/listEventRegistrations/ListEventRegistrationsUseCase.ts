import { inject, injectable } from "tsyringe";
import { Registration } from "@prisma/client";
import { IRegistrationsRepository } from "../../repositories/IRegistrationsRepository";

@injectable()
export class ListEventRegistrationsUseCase {
  constructor(
    @inject("RegistrationsRepository")
    private registrationsRepository: IRegistrationsRepository
  ) {}

  async execute(eventId: string): Promise<Registration[]> {
    const registrations = await this.registrationsRepository.findByEvent(eventId);

    return registrations;
  }
}
