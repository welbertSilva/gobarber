import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppError';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }:Request): Promise<User> {
        const usersRepository = getRepository(User);
        const checkUserExists = await usersRepository.findOne({
            where:{ email },
        });      
        if (checkUserExists) {
            throw new AppError('Email address already used.',400);
        }
    
        const hashedPassword = await hash(password, 8);
    
    /**Chamando metodo create dentro do respositorio  passando os paramentros já tratados acima*/
    const user = usersRepository.create({
        name,
        email,
        password: hashedPassword,
     });

     await usersRepository.save(user);
     return user;
    }

    public async show(){
        const usersRepository = new UsersRepository();
        const allUsers = await usersRepository.findAllUsers();
        return allUsers;
    } 
}
export default CreateUserService;