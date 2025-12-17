"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRegistrationUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../shared/errors/AppError");
let CreateRegistrationUseCase = class CreateRegistrationUseCase {
    constructor(registrationsRepository, eventsRepository) {
        this.registrationsRepository = registrationsRepository;
        this.eventsRepository = eventsRepository;
    }
    async execute({ userId, eventId }) {
        // 1. Buscar o evento para validar regras
        const event = await this.eventsRepository.findById(eventId);
        if (!event) {
            throw new AppError_1.AppError("Event not found", 404);
        }
        // 2. Regra: Organizador não pode se inscrever no próprio evento
        if (event.organizerId === userId) {
            throw new AppError_1.AppError("Organizers cannot subscribe to their own events", 403);
        }
        // 3. Verificar se já existe inscrição
        const registrationAlreadyExists = await this.registrationsRepository.findByUserAndEvent(userId, eventId);
        if (registrationAlreadyExists) {
            throw new AppError_1.AppError("User already registered to this event", 409);
        }
        // 4. Criar inscrição
        const registration = await this.registrationsRepository.create({
            userId,
            eventId,
        });
        return registration;
    }
};
exports.CreateRegistrationUseCase = CreateRegistrationUseCase;
exports.CreateRegistrationUseCase = CreateRegistrationUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("RegistrationsRepository")),
    __param(1, (0, tsyringe_1.inject)("EventsRepository")),
    __metadata("design:paramtypes", [Object, Object])
], CreateRegistrationUseCase);
