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
exports.SendMessageUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../shared/errors/AppError");
let SendMessageUseCase = class SendMessageUseCase {
    constructor(messagesRepository, friendshipsRepository) {
        this.messagesRepository = messagesRepository;
        this.friendshipsRepository = friendshipsRepository;
    }
    async execute({ senderId, receiverId, content }) {
        if (!content) {
            throw new AppError_1.AppError("Content is required");
        }
        if (senderId === receiverId) {
            throw new AppError_1.AppError("You cannot send a message to yourself");
        }
        // Check if users are friends
        const friendship = await this.friendshipsRepository.findByRequesterAndAddressee(senderId, receiverId);
        // Verify if friendship exists AND is accepted
        // Note: findByRequesterAndAddressee returns the friendship regardless of who is requester/addressee
        // We just need to check if status is ACCEPTED.
        if (!friendship || friendship.status !== "ACCEPTED") {
            throw new AppError_1.AppError("You can only send messages to friends", 403);
        }
        const message = await this.messagesRepository.create({
            senderId,
            receiverId,
            content,
        });
        return message;
    }
};
exports.SendMessageUseCase = SendMessageUseCase;
exports.SendMessageUseCase = SendMessageUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("MessagesRepository")),
    __param(1, (0, tsyringe_1.inject)("FriendshipsRepository")),
    __metadata("design:paramtypes", [Object, Object])
], SendMessageUseCase);
