import { Module } from '@nestjs/common';
import { ConfigModule } from './common/config';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { FeesModule } from './fees/fees.module';
@Module({ imports: [ConfigModule, StudentsModule, CoursesModule, FeesModule] })
export class AppModule {
}
