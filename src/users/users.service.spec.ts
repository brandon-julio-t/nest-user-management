import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', async () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to add user', async () => {
    expect(
      service.create({
        name: 'name',
        email: 'email',
        age: 1,
        address: 'address',
      }),
    ).toBeTruthy();

    const users = await service.getAll();
    expect(users.length).toBe(1);

    const [user] = users;
    expect(user.id).toBeDefined();
  });

  it('should be able to find user', async () => {
    const [user] = await service.getAll();

    expect(service.getOneById(user.id)).toBe(user);
  });

  it('should be able to update user', async () => {
    const [user] = await service.getAll();

    const newName = 'new name';

    await service.update({ ...user, name: newName });

    const updatedUser = await service.getOneById(user.id);
    expect(updatedUser?.name).toBe(newName);
  });

  it('should be able to remove user', async () => {
    const [user] = await service.getAll();

    expect(service.delete(user)).toBeTruthy();
    expect(service.getOneById(user.id)).toBeNull();

    const users = await service.getAll();
    expect(users.length).toBe(0);
  });
});
