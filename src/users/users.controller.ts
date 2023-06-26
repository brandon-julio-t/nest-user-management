import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import CreateUserDto from './dtos/create-user.dto';
import UpdateUserDto from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private svc: UsersService) {}

  @Get()
  async getAll() {
    return await this.svc.getAll();
  }

  @Get(':id')
  async getOneById(@Param('id') id: string) {
    const entity = await this.svc.getOneById(id);

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateUserDto) {
    return await this.svc.create(payload);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    const entity = await this.getOneById(id);

    return await this.svc.update({ ...entity, ...payload });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const entity = await this.getOneById(id);

    return await this.svc.delete(entity);
  }
}
