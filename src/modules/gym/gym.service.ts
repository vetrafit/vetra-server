import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateGymDTO, UpdateGymDTO } from './gym.dto';

@Injectable()
export class GymService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    return await this.prisma.gym.findMany();
  }

  async getOne(id: string, includeUsers?: boolean) {
    const gym = await this.prisma.gym.findUnique({
      where: { id },
      include: includeUsers
        ? { users: { include: { user: true } } }
        : undefined,
    });

    if (!gym) {
      throw new NotFoundException(`Gym with ID ${id} not found`);
    }

    return gym;
  }

  async create(data: CreateGymDTO) {
    return await this.prisma.gym.create({
      data,
    });
  }

  async update(id: string, data: UpdateGymDTO) {
    const gym = await this.prisma.gym.update({
      where: { id },
      data,
    });

    return gym;
  }

  async delete(id: string) {
    return await this.prisma.gym.delete({
      where: { id },
    });
  }
}
