"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApproveRegistrationController = void 0;
const tsyringe_1 = require("tsyringe");
const ApproveRegistrationUseCase_1 = require("./ApproveRegistrationUseCase");
class ApproveRegistrationController {
    async handle(request, response) {
        const { id: userId } = request.user;
        const { id: registrationId } = request.params;
        const approveRegistrationUseCase = tsyringe_1.container.resolve(ApproveRegistrationUseCase_1.ApproveRegistrationUseCase);
        await approveRegistrationUseCase.execute({
            registrationId,
            userId,
        });
        return response.status(204).send();
    }
}
exports.ApproveRegistrationController = ApproveRegistrationController;
