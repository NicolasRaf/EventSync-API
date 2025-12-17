"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListFriendRequestsController = void 0;
const tsyringe_1 = require("tsyringe");
const ListFriendRequestsUseCase_1 = require("./ListFriendRequestsUseCase");
class ListFriendRequestsController {
    async handle(request, response) {
        const { id } = request.user;
        const listFriendRequestsUseCase = tsyringe_1.container.resolve(ListFriendRequestsUseCase_1.ListFriendRequestsUseCase);
        const requests = await listFriendRequestsUseCase.execute(id);
        return response.json(requests);
    }
}
exports.ListFriendRequestsController = ListFriendRequestsController;
