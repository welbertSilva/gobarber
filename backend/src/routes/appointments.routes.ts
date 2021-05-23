import { parseISO } from 'date-fns';

import {  Router } from 'express';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

//Encapsulando todas as rotas dentro do middleware (ensureAuthenticated)
appointmentsRouter.use(ensureAuthenticated);

/**Rota para listar  todos agendamentos */
appointmentsRouter.get('/',async(request,response) =>{
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    return response.json(appointments);
});

/**Rota de criação de novo agendamento*/
appointmentsRouter.post('/',async(request,response) => {
    const { provider_id, date } = request.body;

    const parseDate = parseISO(date);  
    const createAppointment = new CreateAppointmentService();
    const appointment = await createAppointment.execute({
        provider_id,
        date:parseDate,
    });
    /**Retornando o objeto criado */
    return response.json(appointment); 
});

export default appointmentsRouter;