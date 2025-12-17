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
exports.GetEventDetailsUseCase = void 0;
const tsyringe_1 = require("tsyringe");
let GetEventDetailsUseCase = class GetEventDetailsUseCase {
    constructor(eventsRepository, registrationsRepository, reviewsRepository) {
        this.eventsRepository = eventsRepository;
        this.registrationsRepository = registrationsRepository;
        this.reviewsRepository = reviewsRepository;
    }
    async execute(eventId, userId) {
        const event = await this.eventsRepository.findById(eventId);
        if (!event) {
            throw new Error("Event not found");
        }
        const registrations = await this.registrationsRepository.findByEvent(eventId);
        // Map registrations to basic participant info (id and name) from the embedded 'user' object
        // Assuming 'user' is included in registrations from the findByEvent implementation
        const participants = registrations.map((reg) => ({
            id: reg.user.id,
            name: reg.user.name,
        }));
        let userHasReviewed = false;
        if (userId) {
            const review = await this.reviewsRepository.findByUserAndEvent(userId, eventId);
            userHasReviewed = !!review;
        }
        return {
            ...event,
            participants,
            userHasReviewed
        };
    }
};
exports.GetEventDetailsUseCase = GetEventDetailsUseCase;
exports.GetEventDetailsUseCase = GetEventDetailsUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("EventsRepository")),
    __param(1, (0, tsyringe_1.inject)("RegistrationsRepository")),
    __param(2, (0, tsyringe_1.inject)("ReviewsRepository")),
    __metadata("design:paramtypes", [Object, Object, Object])
], GetEventDetailsUseCase);
