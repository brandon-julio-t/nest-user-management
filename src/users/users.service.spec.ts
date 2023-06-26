import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
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

  it('should able to add user', () => {
    expect(
      service.save({
        name: 'name',
        email: 'email',
        age: 1,
        address: 'address',
      }),
    ).toBeTruthy();

    const users = service.getAll();
    expect(users.length).toBe(1);

    const [user] = users;
    expect(user.id).toBeDefined();
  });

  it('should able to find user', () => {
    const [user] = service.getAll();

    expect(service.getOneById(user.id)).toBe(user);
  });

  it('should able to update user', () => {
    const [user] = service.getAll();

    const newName = 'new name';

    service.update({ ...user, name: newName });

    expect(service.getOneById(user.id)?.name).toBe(newName);
  });

  it('should be able to remove user', () => {
    const [user] = service.getAll();

    expect(service.delete(user)).toBeTruthy();
    expect(service.getOneById(user.id)).toBeNull();
  });
});
