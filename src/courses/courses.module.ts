import { Module } from '@nestjs/common';
import { readFileSync } from 'node:fs';
import { APP_CONFIG, AppConfig } from '../common/config';
import { AppLogger } from '../common/logger';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CreditService } from './credit.service';
import { COURSE_STORE, InMemoryCourseStore, JsonFileCourseStore } from './store/course-store';
@Module({ controllers: [CoursesController], providers: [CoursesService, CreditService, { provide: COURSE_STORE, inject: [APP_CONFIG, AppLogger], useFactory: (config: AppConfig, logger: AppLogger) => { logger.log(config.storage === 'memory' ? 'Using memory storage' : 'Using file storage'); return config.storage === 'memory' ? new InMemoryCourseStore(JSON.parse(readFileSync('data/courses.json', 'utf8'))) : new JsonFileCourseStore('data/courses.json'); } }], exports: [CoursesService] })
export class CoursesModule {
}
