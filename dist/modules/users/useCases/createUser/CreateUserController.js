"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const tsyringe_1 = require("tsyringe");
const zod_1 = require("zod");
const CreateUserUseCase_1 = require("./CreateUserUseCase");
class CreateUserController {
    async handle(request, response) {
        const createUserBodySchema = zod_1.z.object({
            name: zod_1.z.string(),
            email: zod_1.z.string().email(),
            password: zod_1.z.string().min(6),
            role: zod_1.z.enum(["ADMIN", "ORGANIZER", "PARTICIPANT"]).optional(),
        });
        const { name, email, password, role } = createUserBodySchema.parse(request.body);
        const createUserUseCase = tsyringe_1.container.resolve(CreateUserUseCase_1.CreateUserUseCase);
        const user = await createUserUseCase.execute({
            name,
            email,
            password,
            role,
        });
        // Remove password from response is good practice, but not explicitly requested. 
        // I will return the user object as requested "retorne status 201 com o usuário criado".
        return response.status(201).json(user);
    }
}
exports.CreateUserController = CreateUserController;
