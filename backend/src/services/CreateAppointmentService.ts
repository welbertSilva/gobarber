import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';

interface RequestDTO {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentsRepository:AppointmentsRepository;

    constructor(appointmentsRepository:AppointmentsRepository){
        this.appointmentsRepository = appointmentsRepository;
    }

public execute({ provider, date }:RequestDTO):Appointment {
    
    const appointmentDate = startOfHour(date); /**Convertendo a data para data única */
    const findappointmentinSameDate = this.appointmentsRepository.findByDate(appointmentDate);

     if(findappointmentinSameDate){
         throw Error('This appointment already booked.');
     }

    /**Chamando metodo create dentro do respositorio  passando os paramentros já tratados acima*/
    const appointment = this.appointmentsRepository.create({
        provider,
        date: appointmentDate,
     });

     return appointment;
    }
}

export default CreateAppointmentService;