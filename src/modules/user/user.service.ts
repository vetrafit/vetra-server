import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return this.prisma.user.findMany();
  }

  async getOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async create(userId: string, data: CreateUserDTO) {
    return this.prisma.user.create({
      data: {
        id: userId,
        ...data,
        superAdmin: data.superAdmin ?? false,
      },
    });
  }
}
