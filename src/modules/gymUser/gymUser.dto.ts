import { GymRole, GymUserStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGymUserDTO {
  @IsString()
  @IsNotEmpty()
  gymId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEnum(['ADMIN', 'COACH', 'MEMBER'])
  @IsOptional()
  role: GymRole;

  @IsEnum(['PENDING', 'APPROVED', 'INACTIVE', 'TERMINATED'])
  @IsOptional()
  status: GymUserStatus;
}

export class UpdateGymUserDTO {
  @IsEnum(['ADMIN', 'COACH', 'MEMBER'])
  @IsOptional()
  role: GymRole;

  @IsEnum(['PENDING', 'APPROVED', 'INACTIVE', 'TERMINATED'])
  @IsOptional()
  status: GymUserStatus;
}
