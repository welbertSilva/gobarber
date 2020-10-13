import { request, response, Router } from 'express';
import {  parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

/**Rota para listar  todos agendamentos */
appointmentsRouter.get('/',(request,response) =>{
    const appointments = appointmentsRepository.all();
    return response.json(appointments);
});

/**Rota de criação de novo agendamento*/
appointmentsRouter.post('/',(request,response) => {
    try {
        const { provider, date } = request.body;
        const parseDate = parseISO(date);  
        const createAppointment = new CreateAppointmentService(appointmentsRepository);

        const appointment = createAppointment.execute({ provider, date:parseDate });
        /**Retornando o objeto criado */
        return response.json(appointment);
        
    } catch (error) {
        response.status(400).json({error: error.message})
    }
});

export default appointmentsRouter;