import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { GymModule } from './modules/gym/gym.module';

@Module({
  imports: [UserModule, GymModule, PrismaModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
