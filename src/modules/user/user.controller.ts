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
import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async list(@Query('includeGyms', new ParseBoolPipe()) includeGyms?: boolean) {
    return await this.userService.list(includeGyms);
  }

  @Get(':id')
  async getOne(
    @Param('id') id: string,
    @Query('includeGyms', new ParseBoolPipe()) includeGyms?: boolean,
  ) {
    return await this.userService.getOne(id, includeGyms);
  }

  @Post()
  async create(@Body() body: { userId: string; data: CreateUserDTO }) {
    return await this.userService.create(body.userId, body.data);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDTO) {
    return await this.userService.update(id, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
