import { EntityRepository, getRepository, Repository } from 'typeorm';

import User from '../models/User';

@EntityRepository(User)
class UsersRepository extends Repository<User>{
    public async findAllUsers(){
        const findUsers = await getRepository(User).find();
        return findUsers;
    }
}
export default UsersRepository;