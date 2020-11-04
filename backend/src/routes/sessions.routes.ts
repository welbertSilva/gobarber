import {  Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

/**Rota de criação de novo usuario*/
sessionsRouter.post('/',async(request,response) => {
    try {    
        const { email, password } = request.body;
        const authenticateUser = new AuthenticateUserService();
        const { user } =  await authenticateUser.execute({
            email, 
            password,
        });
        delete user.password;
        
        return response.json({ user });
    } catch (error) {
        response.status(400).json({error: error.message})
    }
});

export default sessionsRouter;