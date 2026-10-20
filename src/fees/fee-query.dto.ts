import { Type } from 'class-transformer';
import { IsDefined, IsInt, Max, Min } from 'class-validator';
export class FeeQueryDto {
    @IsDefined({ message: 'creditHours is required' })
    @Type(() => Number)
    @IsInt({ message: 'creditHours must be a whole number' })
    @Min(1, { message: 'creditHours must be at least 1' })
    @Max(24, { message: 'creditHours must be at most 24' })
    creditHours!: number;
}
