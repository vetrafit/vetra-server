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
import { GymService } from './gym.service';
import { CreateGymDTO, UpdateGymDTO } from './gym.dto';

@Controller('gyms')
export class GymController {
  constructor(private readonly gymService: GymService) {}

  @Get()
  async list() {
    return await this.gymService.list();
  }

  @Get(':id')
  async getOne(
    @Param('id') id: string,
    @Query('includeUsers', new ParseBoolPipe()) includeUsers?: boolean,
  ) {
    return await this.gymService.getOne(id, includeUsers);
  }

  @Post()
  async create(@Body() body: CreateGymDTO) {
    return await this.gymService.create(body);
  }

  @Patch(':id')
  async updateGym(@Param('id') id: string, @Body() data: UpdateGymDTO) {
    return await this.gymService.update(id, data);
  }

  @Delete(':id')
  async deleteGym(@Param('id') id: string) {
    return await this.gymService.delete(id);
  }
}
