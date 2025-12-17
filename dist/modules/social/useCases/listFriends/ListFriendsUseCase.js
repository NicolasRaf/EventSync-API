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
exports.ListFriendsUseCase = void 0;
const tsyringe_1 = require("tsyringe");
let ListFriendsUseCase = class ListFriendsUseCase {
    constructor(friendshipsRepository) {
        this.friendshipsRepository = friendshipsRepository;
    }
    async execute(userId) {
        const friendships = await this.friendshipsRepository.findFriendsByUserId(userId);
        const friends = friendships.map((friendship) => {
            // If I am the requester, the friend is the addressee
            // If I am the addressee, the friend is the requester
            const isRequester = friendship.requesterId === userId;
            const friendUser = isRequester ? friendship.addressee : friendship.requester;
            return {
                id: friendUser.id,
                name: friendUser.name,
                email: friendUser.email,
            };
        });
        return friends;
    }
};
exports.ListFriendsUseCase = ListFriendsUseCase;
exports.ListFriendsUseCase = ListFriendsUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("FriendshipsRepository")),
    __metadata("design:paramtypes", [Object])
], ListFriendsUseCase);
