import { inject, injectable } from "tsyringe";
import { User } from "@prisma/client";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export class GetUserProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(userId: string): Promise<Omit<User, "password">> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
