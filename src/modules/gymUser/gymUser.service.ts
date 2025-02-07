import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateGymUserDTO, UpdateGymUserDTO } from './gymUser.dto';

@Injectable()
export class GymUserService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    return await this.prisma.gymUser.findMany();
  }

  async getOne({
    id,
    includeGym,
    includeUser,
  }: {
    id: string;
    includeGym?: boolean;
    includeUser?: boolean;
  }) {
    const gymUser = await this.prisma.gymUser.findUnique({
      where: { id },
      include: {
        gym: includeGym || false,
        user: includeUser || false,
      },
    });

    if (!gymUser) {
      throw new NotFoundException(`GymUser with ID ${id} not found`);
    }

    return gymUser;
  }

  async create(data: CreateGymUserDTO) {
    return await this.prisma.gymUser.create({
      data,
    });
  }

  async update(id: string, data: UpdateGymUserDTO) {
    return await this.prisma.gymUser.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return await this.prisma.gymUser.delete({
      where: { id },
    });
  }
}
