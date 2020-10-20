import { isEqual } from 'date-fns';
import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

/**
 * Metodo responsavel por verificar se a data já foi cadastrada para um agendamento
 */
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>{
    private appointments:Appointment[];
    public async findByDate(date:Date): Promise<Appointment | null> {
        const findappointment = await this.findOne({
             where:{ date },
         });
        return findappointment || null;
    }
}

export default AppointmentsRepository;