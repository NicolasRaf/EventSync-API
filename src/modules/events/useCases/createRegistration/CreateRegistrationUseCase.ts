import { inject, injectable } from "tsyringe";
import { IRegistrationsRepository } from "../../repositories/IRegistrationsRepository";
import { Registration } from "@prisma/client";

interface ICreateRegistrationRequest {
  userId: string;
  eventId: string;
}

@injectable()
export class CreateRegistrationUseCase {
  constructor(
    @inject("RegistrationsRepository")
    private registrationsRepository: IRegistrationsRepository
  ) {}

  async execute({ userId, eventId }: ICreateRegistrationRequest): Promise<Registration> {
    const registrationAlreadyExists = await this.registrationsRepository.findByUserAndEvent(
      userId,
      eventId
    );

    if (registrationAlreadyExists) {
      throw new Error("User already registered to this event");
    }

    const registration = await this.registrationsRepository.create({
      userId,
      eventId,
    });

    return registration;
  }
}
