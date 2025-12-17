"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsRepository = void 0;
const client_1 = require("@prisma/client");
// Assumption: PrismaClient is instantiated here as per previous pattern.
const prisma = new client_1.PrismaClient();
class EventsRepository {
    async create(data) {
        const event = await prisma.event.create({
            data,
        });
        return event;
    }
    async listAll() {
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
    async findById(id) {
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
    async findRegistrationsByUserId(userId) {
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
    async update(event) {
        // Explicitly select scalar fields to avoid passing relations (like organizer, registrations) that might be present in the event object
        const { title, description, date, location, organizerId, overallRating } = event;
        const updatedEvent = await prisma.event.update({
            where: {
                id: event.id,
            },
            data: {
                title,
                description,
                date,
                location,
                organizerId,
                overallRating,
            },
        });
        return updatedEvent;
    }
}
exports.EventsRepository = EventsRepository;
