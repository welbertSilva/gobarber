import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

/**Rota de criação de novo usuario*/
sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
