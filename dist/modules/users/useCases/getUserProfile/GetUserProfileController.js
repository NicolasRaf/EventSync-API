"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserProfileController = void 0;
const tsyringe_1 = require("tsyringe");
const GetUserProfileUseCase_1 = require("./GetUserProfileUseCase");
class GetUserProfileController {
    async handle(request, response) {
        const { id } = request.user;
        const getUserProfileUseCase = tsyringe_1.container.resolve(GetUserProfileUseCase_1.GetUserProfileUseCase);
        const user = await getUserProfileUseCase.execute(id);
        return response.json(user);
    }
}
exports.GetUserProfileController = GetUserProfileController;
