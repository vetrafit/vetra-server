import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async list(includeGyms?: boolean) {
    return await this.prisma.user.findMany({
      include: includeGyms
        ? { gymUsers: { include: { gym: true } } }
        : undefined,
    });
  }

  async getOne(id: string, includeGyms?: boolean) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: includeGyms
        ? { gymUsers: { include: { gym: true } } }
        : undefined,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async create(userId: string, data: CreateUserDTO) {
    return await this.prisma.user.create({
      data: { id: userId, ...data },
    });
  }

  async update(id: string, data: UpdateUserDTO) {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });

    return user;
  }

  async delete(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
