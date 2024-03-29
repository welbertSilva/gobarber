import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });
    return user;
  }
  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const createUser = this.ormRepository.create({
      name,
      email,
      password,
    });
    await this.ormRepository.save(createUser);
    return createUser;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findAllUsers(): Promise<User[]> {
    const findUsers = await this.ormRepository.find();
    return findUsers;
  }
}
export default UsersRepository;
