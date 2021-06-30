import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

//Encapsulando todas as rotas dentro do middleware (ensureAuthenticated)
appointmentsRouter.use(ensureAuthenticated);

/**Rota de criação de novo agendamento*/
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
