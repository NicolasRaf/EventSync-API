import { Prisma, Event, PrismaClient } from "@prisma/client";
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
}

