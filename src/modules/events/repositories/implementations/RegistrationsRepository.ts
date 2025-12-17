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

  async findByEvent(eventId: string): Promise<Registration[]> {
    const registrations = await prisma.registration.findMany({
      where: {
        eventId,
      },
      include: {
        user: true,
      },
    });
    return registrations;
  }

  async findByUserId(userId: string): Promise<Registration[]> {
    const registrations = await prisma.registration.findMany({
      where: {
        userId,
      },
    });
    return registrations;
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

  async findById(id: string): Promise<Registration | null> {
    const registration = await prisma.registration.findUnique({
      where: {
        id,
      },
      include: {
        event: true, // Including event to check ownership later
      }
    });
    return registration;
  }

  async updateStatus(id: string, status: string): Promise<void> {
    await prisma.registration.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }

  async deleteById(id: string): Promise<void> {
    await prisma.registration.delete({
      where: {
        id,
      },
    });
  }

  async delete(userId: string, eventId: string): Promise<void> {
    await prisma.registration.delete({
      where: {
        userId_eventId: {
          userId,
          eventId,
        },
      },
    });
  }
}

