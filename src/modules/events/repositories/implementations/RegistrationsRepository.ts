import { Prisma, Registration, PrismaClient } from "@prisma/client";
import { IRegistrationsRepository } from "../IRegistrationsRepository";

const prisma = new PrismaClient();

export class RegistrationsRepository implements IRegistrationsRepository {
  async create(data: Prisma.RegistrationUncheckedCreateInput): Promise<Registration> {
    const registration = await prisma.registration.create({
      data,
    });
    return registration;
  }

  async findByUserAndEvent(userId: string, eventId: string): Promise<Registration | null> {
    const registration = await prisma.registration.findUnique({
      where: {
        userId_eventId: {
          userId,
          eventId,
        },
      },
    });
    return registration;
  }

  async update(registration: Registration): Promise<Registration> {
    const updatedRegistration = await prisma.registration.update({
      where: {
        id: registration.id,
      },
      data: registration,
    });
    return updatedRegistration;
  }
}

