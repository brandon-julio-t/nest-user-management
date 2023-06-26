import { Injectable } from '@nestjs/common';
import { User } from './contracts/user.interface';
import CreateUserDto from './dtos/create-user.dto';
import { v4 as uuid } from 'uuid';
import UpdateUserDto from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  private static _entities = [] as User[];

  private get entities() {
    return UsersService._entities;
  }

  private set entities(newEntities: User[]) {
    UsersService._entities = newEntities;
  }

  async getAll() {
    return this.entities;
  }

  async getOneById(id: string) {
    return this.entities.find((user) => user.id === id) ?? null;
  }

  async create(payload: CreateUserDto) {
    const entity = {
      id: uuid(),
      ...payload,
    };

    this.entities.push(entity);

    return true;
  }

  async update(payload: UpdateUserDto) {
    const entity = this.getOneById(payload.id);

    if (!entity) {
      return false;
    }

    Object.assign(entity, payload);

    return true;
  }

  async delete(user: User) {
    const entity = this.getOneById(user.id);

    if (!entity) {
      return false;
    }

    const filtered = this.entities.filter((u) => u.id !== user.id);

    this.entities = filtered;

    return true;
  }
}
