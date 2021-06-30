import { container } from 'tsyringe';

//Appointments
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

//Users
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

//Appointments
container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository //Retornando uma instância do repositório de Appointments
);

//Users
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository //Retornando uma instância do repositório de UsersRepository
);
