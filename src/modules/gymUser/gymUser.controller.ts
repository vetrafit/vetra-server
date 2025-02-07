import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GymUserService } from './gymUser.service';
import { CreateGymUserDTO } from './gymUser.dto';

@Controller('gymUsers')
export class GymUserController {
  constructor(private readonly gymUserService: GymUserService) {}

  @Get()
  async list() {
    return await this.gymUserService.list();
  }

  @Get(':id')
  async getOne(
    @Param('id') id: string,
    @Query('includeGym', new ParseBoolPipe()) includeGym?: boolean,
    @Query('includeUser', new ParseBoolPipe()) includeUser?: boolean,
  ) {
    return await this.gymUserService.getOne({ id, includeGym, includeUser });
  }

  @Post()
  async create(@Body() body: CreateGymUserDTO) {
    return await this.gymUserService.create(body);
  }

  @Patch(':id')
  async updateGymUser(@Param('id') id: string, @Body() data: CreateGymUserDTO) {
    return await this.gymUserService.update(id, data);
  }

  @Delete(':id')
  async deleteGymUser(@Param('id') id: string) {
    return await this.gymUserService.delete(id);
  }
}
