import { User } from '../contracts/user.interface';

type CreateUserDto = Omit<User, 'id'>;

export default CreateUserDto;
