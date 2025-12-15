import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { Prisma, User } from "@prisma/client";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface ICreateUserRequest extends Prisma.UserCreateInput {
  // We can extend if needed, but Prisma types are good
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password, role }: ICreateUserRequest): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      role,
    });

    return user;
  }
}
