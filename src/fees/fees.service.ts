import { Inject, Injectable } from '@nestjs/common';
import { StudentsService } from '../students/students.module';
import { FEE_POLICY, FeePolicy } from './fee-policies';
@Injectable()
export class FeesService {
    constructor(
    @Inject(FEE_POLICY)
    private readonly policy: FeePolicy, 
    @Inject('FEE_RATE')
    private readonly rate: number, private readonly students: StudentsService) { }
    info() { return { policy: this.policy.name, ratePerCreditHour: this.rate }; }
    calculate(rollNumber: string, creditHours: number) { const { name, cgpa } = this.students.findOne(rollNumber); return { rollNumber, name, cgpa, creditHours, ...this.info(), total: this.policy.calculate(creditHours, cgpa, this.rate) }; }
}
