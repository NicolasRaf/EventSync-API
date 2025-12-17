"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationsRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class RegistrationsRepository {
    async create(data) {
        const registration = await prisma.registration.create({
            data,
        });
        return registration;
    }
    async findByUserAndEvent(userId, eventId) {
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
    async findByEvent(eventId) {
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
    async findByUserId(userId) {
        const registrations = await prisma.registration.findMany({
            where: {
                userId,
            },
        });
        return registrations;
    }
    async update(registration) {
        const updatedRegistration = await prisma.registration.update({
            where: {
                id: registration.id,
            },
            data: registration,
        });
        return updatedRegistration;
    }
    async findById(id) {
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
    async updateStatus(id, status) {
        await prisma.registration.update({
            where: {
                id,
            },
            data: {
                status,
            },
        });
    }
    async deleteById(id) {
        await prisma.registration.delete({
            where: {
                id,
            },
        });
    }
    async delete(userId, eventId) {
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
exports.RegistrationsRepository = RegistrationsRepository;
