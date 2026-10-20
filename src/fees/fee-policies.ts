export const FEE_POLICY = Symbol('FEE_POLICY');
export interface FeePolicy {
    readonly name: string;
    calculate(creditHours: number, cgpa: number, ratePerCreditHour: number): number;
}
export class StandardFeePolicy implements FeePolicy {
    readonly name = 'standard';
    calculate(hours: number, _cgpa: number, rate: number) { return hours * rate; }
}
export class MeritFeePolicy implements FeePolicy {
    readonly name = 'merit';
    calculate(hours: number, cgpa: number, rate: number) { return hours * rate * (cgpa >= 3.5 ? 0.5 : cgpa >= 3 ? 0.75 : 1); }
}
