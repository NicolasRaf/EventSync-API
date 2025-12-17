"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUserMessagesController = void 0;
const tsyringe_1 = require("tsyringe");
const ListUserMessagesUseCase_1 = require("./ListUserMessagesUseCase");
class ListUserMessagesController {
    async handle(request, response) {
        const { id } = request.user;
        const listUserMessagesUseCase = tsyringe_1.container.resolve(ListUserMessagesUseCase_1.ListUserMessagesUseCase);
        const messages = await listUserMessagesUseCase.execute(id);
        return response.json(messages);
    }
}
exports.ListUserMessagesController = ListUserMessagesController;
