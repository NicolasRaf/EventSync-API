"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserController = void 0;
const tsyringe_1 = require("tsyringe");
const zod_1 = require("zod");
const AuthenticateUserUseCase_1 = require("./AuthenticateUserUseCase");
class AuthenticateUserController {
    async handle(request, response) {
        const authenticateBodySchema = zod_1.z.object({
            email: zod_1.z.string().email(),
            password: zod_1.z.string(),
        });
        const { email, password } = authenticateBodySchema.parse(request.body);
        const authenticateUserUseCase = tsyringe_1.container.resolve(AuthenticateUserUseCase_1.AuthenticateUserUseCase);
        const token = await authenticateUserUseCase.execute({
            email,
            password,
        });
        return response.json(token);
    }
}
exports.AuthenticateUserController = AuthenticateUserController;
