import appError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointmentService', () => {
  it('should be able to create a new appointment.', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );
    const appointment = await createAppointment.execute({
      provider_id: '123456',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able create two appointments on the same time.', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    const appointment = await createAppointment.execute({
      provider_id: '123456',
      date: appointmentDate,
    });
    expect(
      createAppointment.execute({
        provider_id: '123456',
        date: appointmentDate,
      })
    ).rejects.toBeInstanceOf(appError);
  });
});
