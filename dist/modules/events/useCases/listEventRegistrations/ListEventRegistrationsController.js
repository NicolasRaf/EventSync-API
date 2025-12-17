"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListEventRegistrationsController = void 0;
const tsyringe_1 = require("tsyringe");
const ListEventRegistrationsUseCase_1 = require("./ListEventRegistrationsUseCase");
class ListEventRegistrationsController {
    async handle(request, response) {
        const { eventId } = request.params;
        const listEventRegistrationsUseCase = tsyringe_1.container.resolve(ListEventRegistrationsUseCase_1.ListEventRegistrationsUseCase);
        const registrations = await listEventRegistrationsUseCase.execute(eventId);
        return response.json(registrations);
    }
}
exports.ListEventRegistrationsController = ListEventRegistrationsController;
