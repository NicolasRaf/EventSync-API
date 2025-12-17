"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUserRegistrationsController = void 0;
const tsyringe_1 = require("tsyringe");
const ListUserRegistrationsUseCase_1 = require("./ListUserRegistrationsUseCase");
class ListUserRegistrationsController {
    async handle(request, response) {
        const { id: userId } = request.user;
        const listUserRegistrationsUseCase = tsyringe_1.container.resolve(ListUserRegistrationsUseCase_1.ListUserRegistrationsUseCase);
        const registrations = await listUserRegistrationsUseCase.execute(userId);
        return response.json(registrations);
    }
}
exports.ListUserRegistrationsController = ListUserRegistrationsController;
