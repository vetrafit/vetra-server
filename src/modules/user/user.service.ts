import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return await this.prisma.user.findMany();
  }

  async getOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
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

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
}
