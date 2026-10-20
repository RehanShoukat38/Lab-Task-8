import { Controller, Get, Inject, Module, Param, Query } from '@nestjs/common';
import { AppLogger } from '../common/logger';
import { StudentsModule } from '../students/students.module';
import { FeesService } from './fees.service';
import { FEE_POLICY, StandardFeePolicy, MeritFeePolicy } from './fee-policies';
import { FeeQueryDto } from './fee-query.dto';
@Controller('fees')
export class FeesInfoController {
    constructor(
    @Inject('FEE_CALCULATOR')
    private readonly fees: FeesService) { }
    @Get('info')
    info() { return this.fees.info(); }
}
@Controller('fees')
export class FeesController {
    constructor(private readonly fees: FeesService) { }
    @Get(':rollNumber')
    calculate(
    @Param('rollNumber')
    roll: string, 
    @Query()
    q: FeeQueryDto) { return this.fees.calculate(roll, q.creditHours); }
}
@Module({ imports: [StudentsModule], controllers: [FeesInfoController, FeesController], providers: [FeesService, { provide: 'FEE_RATE', useValue: 5000 }, { provide: FEE_POLICY, inject: ['FEE_RATE', AppLogger], useFactory: (_rate: number, logger: AppLogger) => { const policy = process.env.FEE_POLICY === 'merit' ? new MeritFeePolicy() : new StandardFeePolicy(); logger.log(`Using ${policy.name} fee policy`); return policy; } }, { provide: 'FEE_CALCULATOR', useExisting: FeesService }] })
export class FeesModule {
}
