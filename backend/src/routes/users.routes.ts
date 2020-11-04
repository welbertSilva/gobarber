import {  Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

/**Rota de criação de novo usuario*/
usersRouter.post('/',async(request,response) => {
    try {
        const { name, email, password, } = request.body;      
        const createUser = new CreateUserService();
        const user = await createUser.execute({ 
            name,
            email,
            password,
        });

        delete user.password;

        return response.json(user);
    } catch (error) {
        response.status(400).json({error: error.message})
    }
});

export default usersRouter;