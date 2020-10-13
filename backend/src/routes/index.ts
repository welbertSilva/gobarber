import { Router } from  'express';
import appointmentsRouter from  './appointments.routes';

const routes = Router();

routes.use('/appointments',appointmentsRouter);

/** exporta a classe para poder usar em outros locais */
export default routes;