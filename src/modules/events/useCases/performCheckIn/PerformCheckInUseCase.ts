import { inject, injectable } from "tsyringe";
import { IRegistrationsRepository } from "../../repositories/IRegistrationsRepository";
import { Registration } from "@prisma/client";

interface IPerformCheckInRequest {
  eventId: string;
  participantId: string;
}

@injectable()
export class PerformCheckInUseCase {
  constructor(
    @inject("RegistrationsRepository")
    private registrationsRepository: IRegistrationsRepository
  ) {}

  async execute({ eventId, participantId }: IPerformCheckInRequest): Promise<Registration> {
    const registration = await this.registrationsRepository.findByUserAndEvent(
      participantId,
      eventId
    );

    if (!registration) {
      throw new Error("Registration not found");
    }

    if (registration.checkedInAt) {
      throw new Error("User already checked in");
    }

    registration.checkedInAt = new Date();

    const updatedRegistration = await this.registrationsRepository.update(registration);

    return updatedRegistration;
  }
}
