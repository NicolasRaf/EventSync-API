import { PrismaClient, User, Prisma } from "@prisma/client";
import { IUsersRepository } from "../IUsersRepository";

// Since we haven't set up a shared Prisma Client instance yet, I will initialize it here or assume a shared one should be created.
// Usually, clean arch suggests a shared Prisma Client. The user didn't ask for a shared one explicitly but mentioned "Provider: Implementações de Repositórios (Prisma)".
// For now, I will instantiate it here or better, create a shared prisma client in shared/infra if needed? 
// The prompt said: "/infrastructure # Implementações de Repositórios (Prisma), Database".
// So I should probably have a database connection setup. 
// But per specific instruction "Crie a implementação ... usando o PrismaClient", I'll just use it directly. 
// To keep it simple and clean, I will instantiate it. ideally it should be injected or imported from a shared db file.
// I'll assume standard usage for now.

const prisma = new PrismaClient(); // In a real app, this should be a singleton exported from shared/infra/database

export class UsersRepository implements IUsersRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
}
