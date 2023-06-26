import { Test, TestingModule } from '@nestjs/testing';
import { User } from './contracts/user.interface';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let svc: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    svc = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should use user service getAll method', async () => {
    const users = [] as User[];
    jest.spyOn(svc, 'getAll').mockImplementation(() => Promise.resolve(users));

    expect(await controller.getAll()).toBe(users);
    expect(svc.getAll).toBeCalled();
    expect(svc.getAll).toBeCalledTimes(1);
  });

  it('should use user service getOneById method', async () => {
    const user = {
      id: 'id',
      name: 'name',
      email: 'email',
      age: 1,
      address: 'address',
    } as User;

    jest
      .spyOn(svc, 'getOneById')
      .mockImplementation(() => Promise.resolve(user));

    expect(await controller.getOneById('id')).toBe(user);
    expect(svc.getOneById).toBeCalled();
    expect(svc.getOneById).toBeCalledTimes(1);
  });

  it('should throw not found exception if user id does not exist', async () => {
    try {
      await controller.getOneById('dummy id');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should use user service create method', async () => {
    jest.spyOn(svc, 'create').mockImplementation(() => Promise.resolve(true));

    expect(await controller.create({} as any)).toBeTruthy();
    expect(svc.create).toBeCalled();
    expect(svc.create).toBeCalledTimes(1);
  });

  it('should use user service update method', async () => {
    const user = {
      id: 'id',
      name: 'name',
      email: 'email',
      age: 1,
      address: 'address',
    } as User;

    jest
      .spyOn(svc, 'getOneById')
      .mockImplementation(() => Promise.resolve(user));

    jest.spyOn(svc, 'update').mockImplementation(() => Promise.resolve(true));

    expect(await controller.update('id', {} as any)).toBeTruthy();
    expect(svc.update).toBeCalled();
    expect(svc.update).toBeCalledTimes(1);
  });

  it('should use throw not found if user id to be updated does not exist', async () => {
    try {
      await controller.update('dummy id', {} as any);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should use user service delete method', async () => {
    const user = {
      id: 'id',
      name: 'name',
      email: 'email',
      age: 1,
      address: 'address',
    } as User;

    jest
      .spyOn(svc, 'getOneById')
      .mockImplementation(() => Promise.resolve(user));

    jest.spyOn(svc, 'delete').mockImplementation(() => Promise.resolve(true));

    expect(await controller.delete('id')).toBeTruthy();
    expect(svc.delete).toBeCalled();
    expect(svc.delete).toBeCalledTimes(1);
  });

  it('should use throw not found if user id to be deleted does not exist', async () => {
    try {
      await controller.delete('dummy id');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
