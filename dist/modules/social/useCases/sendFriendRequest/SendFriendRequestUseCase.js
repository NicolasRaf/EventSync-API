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
exports.SendFriendRequestUseCase = void 0;
const tsyringe_1 = require("tsyringe");
let SendFriendRequestUseCase = class SendFriendRequestUseCase {
    constructor(friendshipsRepository, usersRepository, eventsRepository) {
        this.friendshipsRepository = friendshipsRepository;
        this.usersRepository = usersRepository;
        this.eventsRepository = eventsRepository;
    }
    async execute({ requesterId, addresseeId }) {
        if (requesterId === addresseeId) {
            throw new Error("You cannot send a friend request to yourself");
        }
        const friendshipAlreadyExists = await this.friendshipsRepository.findByRequesterAndAddressee(requesterId, addresseeId);
        if (friendshipAlreadyExists) {
            console.log(`[DEBUG] Amizade já existe: ${requesterId} -> ${addresseeId}`);
            throw new Error("Friendship request already sent or users are already friends");
        }
        // Verify if they share a common event
        const requesterRegistrations = await this.eventsRepository.findRegistrationsByUserId(requesterId);
        const addresseeRegistrations = await this.eventsRepository.findRegistrationsByUserId(addresseeId);
        const requesterEventIds = new Set(requesterRegistrations.map((r) => r.eventId));
        const hasCommonEvent = addresseeRegistrations.some((r) => requesterEventIds.has(r.eventId));
        if (!hasCommonEvent) {
            console.log(`[DEBUG] Sem evento em comum entre: ${requesterId} e ${addresseeId}`);
            throw new Error("Users must be registered in the same event to send a friend request");
        }
        const friendship = await this.friendshipsRepository.create({
            requesterId,
            addresseeId,
            status: "PENDING",
        });
        return friendship;
    }
};
exports.SendFriendRequestUseCase = SendFriendRequestUseCase;
exports.SendFriendRequestUseCase = SendFriendRequestUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("FriendshipsRepository")),
    __param(1, (0, tsyringe_1.inject)("UsersRepository")),
    __param(2, (0, tsyringe_1.inject)("EventsRepository")),
    __metadata("design:paramtypes", [Object, Object, Object])
], SendFriendRequestUseCase);
