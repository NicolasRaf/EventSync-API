import { Prisma, Event, PrismaClient, Registration } from "@prisma/client";
import { IEventsRepository } from "../IEventsRepository";

// Assumption: PrismaClient is instantiated here as per previous pattern.
const prisma = new PrismaClient();

export class EventsRepository implements IEventsRepository {
  async create(data: Prisma.EventCreateInput): Promise<Event> {
    const event = await prisma.event.create({
      data,
    });
    return event;
  }

  async listAll(): Promise<Event[]> {
    const events = await prisma.event.findMany({
      orderBy: {
        date: "asc",
      },
      include: {
        organizer: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return events;
  }

  async findById(id: string): Promise<Event | null> {
    const event = await prisma.event.findUnique({
      where: {
        id,
      },
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return event;
  }

  async findRegistrationsByUserId(userId: string): Promise<Registration[]> {
    const registrations = await prisma.registration.findMany({
      where: {
        userId,
      },
      include: {
        event: {
          include: {
            reviews: {
              where: {
                userId,
              },
            },
          },
        },
      },
    });

    return registrations;
  }

  async update(id: string, data: Prisma.EventUpdateInput): Promise<Event> {
    const updatedEvent = await prisma.event.update({
      where: {
        id,
      },
      data,
    });
    return updatedEvent;
  }

  async delete(id: string): Promise<void> {
    await prisma.event.delete({
      where: {
        id,
      },
    });
  }
}
