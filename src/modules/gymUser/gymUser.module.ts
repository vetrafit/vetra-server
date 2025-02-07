import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma/prisma.module';
import { GymUserController } from './gymUser.controller';
import { GymUserService } from './gymUser.service';

@Module({
  imports: [PrismaModule],
  controllers: [GymUserController],
  providers: [GymUserService],
  exports: [GymUserService],
})
export class GymUserModule {}
