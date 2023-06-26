import { User } from '../contracts/user.interface';

type UpdateUserDto = Partial<User> & Pick<User, 'id'>;

export default UpdateUserDto;
