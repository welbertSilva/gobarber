import Appointment from '../models/Appointment';
import { startOfHour, parseISO, isEqual } from 'date-fns';

/**DTO - Data Transfer Object */

interface CreateAppointmentDTO{
    provider: string;
    date: Date;
}

class AppointmentsRepository {
    private appointments:Appointment[];

    constructor() {
        this.appointments = [];
    }

    /**
     * Metodo resposável  listar todos appointments
     */
    public all():Appointment[] {
        return this.appointments;        
    }

    /**
     * Metodo responsavel por verificar se a data já foi cadastrada para um agendamento
     */
    public findByDate(date:Date): Appointment | null {
        const findappointment = this.appointments.find(appointment =>
            isEqual(date, appointment.date),
         );
        return findappointment || null;
    }

    /**
     * Metodo resposável por criar um novo objeto appointments
     */
    public create({provider, date}:CreateAppointmentDTO):Appointment {
        /**Criando objeto */        
        const appointment  =  new Appointment({ provider, date });
         /** Adiciomamdo objeto ao array */
        this.appointments.push(appointment);
        return appointment;
    }
}

export default AppointmentsRepository;