import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';


interface RequestDTO {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ provider_id, date }:RequestDTO): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date); /**Convertendo a data para data única */
        const findappointmentinSameDate = await appointmentsRepository.findByDate(appointmentDate);
  
        if(findappointmentinSameDate){
         throw Error('This appointment already booked.');
     }

    /**Chamando metodo create dentro do respositorio  passando os paramentros já tratados acima*/
    const appointment = appointmentsRepository.create({
        provider_id,
        date: appointmentDate,
     });
     await appointmentsRepository.save(appointment);
     return appointment;
    }
}

export default CreateAppointmentService;