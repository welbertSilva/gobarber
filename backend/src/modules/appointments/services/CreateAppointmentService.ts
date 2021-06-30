import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import appError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  date: Date;
}
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate =
      startOfHour(date); /**Convertendo a data para data única */
    const findappointmentinSameDate =
      await this.appointmentsRepository.findByDate(appointmentDate);

    if (findappointmentinSameDate) {
      throw new appError('This appointment already booked.', 400);
    }
    /**Chamando metodo create dentro do respositorio  passando os paramentros já tratados acima*/
    const appointment = this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });
    return appointment;
  }
}
export default CreateAppointmentService;
