import { Gym, GymStatus } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';

export class CreateGymDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  zip: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(\+\d{1,3}[- ]?)?\d{10,15}$/, {
    message: 'phone must be a valid phone number',
  })
  @IsOptional()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  website: string;

  @IsEnum(['PENDING', 'APPROVED', 'INACTIVE', 'TERMINATED'])
  @IsOptional()
  status: GymStatus;
}

export class UpdateGymDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  address: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  city: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  state: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  zip: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(\+\d{1,3}[- ]?)?\d{10,15}$/, {
    message: 'phone must be a valid phone number',
  })
  @IsOptional()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  website: string;

  @IsEnum(['PENDING', 'APPROVED', 'INACTIVE', 'TERMINATED'])
  @IsOptional()
  @IsOptional()
  status: GymStatus;
}
