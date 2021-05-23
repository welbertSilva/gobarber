import {  Router } from 'express';
import User from '../models/User';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

/**Rota de criação de novo usuario*/
sessionsRouter.post('/',async(request,response) => {
     
    const { email, password } = request.body;
    const authenticateUser = new AuthenticateUserService();
    const { user, token } =  await authenticateUser.execute({
        email, 
        password,           
    });
    user.password;
    
    return response.json({ user, token });
});

export default sessionsRouter;