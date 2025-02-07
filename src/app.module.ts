import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { GymModule } from './modules/gym/gym.module';
import { GymUserModule } from '@modules/gymUser/gymUser.module';

@Module({
  imports: [UserModule, GymModule, GymUserModule, PrismaModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
