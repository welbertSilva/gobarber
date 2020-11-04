import {  Router } from 'express';
import { getCustomRepository } from 'typeorm';
import {  parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
/**Rota para listar  todos agendamentos */
appointmentsRouter.get('/',async(request,response) =>{
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    return response.json(appointments);
});

/**Rota de criação de novo agendamento*/
appointmentsRouter.post('/',async(request,response) => {
    try {
        const { provider_id, date } = request.body;
        const parseDate = parseISO(date);  
        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({ provider_id, date:parseDate });
        /**Retornando o objeto criado */
        return response.json(appointment);
        
    } catch (error) {
        response.status(400).json({error: error.message})
    }
});

export default appointmentsRouter;