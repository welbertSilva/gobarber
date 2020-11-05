import {  Router } from 'express';
import User from '../models/User';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

/**Rota de criação de novo usuario*/
sessionsRouter.post('/',async(request,response) => {
    try {    
        const { email, password } = request.body;
        const authenticateUser = new AuthenticateUserService();
        const { user,token } =  await authenticateUser.execute({
            email, 
            password,           
        });
        delete user.password;
        
        return response.json({ user, token });
    } catch (error) {
        response.status(400).json({error: error.message})
    }
});

export default sessionsRouter;