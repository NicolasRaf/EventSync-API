"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListFriendsController = void 0;
const tsyringe_1 = require("tsyringe");
const ListFriendsUseCase_1 = require("./ListFriendsUseCase");
class ListFriendsController {
    async handle(request, response) {
        const { id } = request.user;
        const listFriendsUseCase = tsyringe_1.container.resolve(ListFriendsUseCase_1.ListFriendsUseCase);
        const friends = await listFriendsUseCase.execute(id);
        return response.json(friends);
    }
}
exports.ListFriendsController = ListFriendsController;
