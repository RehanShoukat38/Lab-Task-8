import { Global, Module } from '@nestjs/common';
import { AppLogger, Logger } from './logger';
export const APP_CONFIG = 'APP_CONFIG';
export interface AppConfig {
    storage: string;
}
@Global()
@Module({ providers: [{ provide: APP_CONFIG, useFactory: () => ({ storage: process.env.STORAGE ?? 'file' }) }, AppLogger, { provide: Logger, useExisting: AppLogger }], exports: [APP_CONFIG, AppLogger, Logger] })
export class ConfigModule {
}
