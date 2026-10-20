import { Controller, Get, Injectable, Module, NotFoundException, Param } from '@nestjs/common';
import { readFileSync } from 'node:fs';
import { Logger } from '../common/logger';
import { Student } from './student.entity';
@Injectable()
export class StudentsService {
    constructor(private readonly logger: Logger) { }
    private students: Student[] = JSON.parse(readFileSync('data/students.json', 'utf8'));
    findAll() { return this.students; }
    findOne(rollNumber: string) { const student = this.students.find(s => s.rollNumber === rollNumber); if (!student)
        throw new NotFoundException('Student not found'); return student; }
}
@Controller('students')
export class StudentsController {
    constructor(private readonly students: StudentsService) { }
    @Get()
    list() { return this.students.findAll(); }
    @Get(':rollNumber')
    one(
    @Param('rollNumber')
    roll: string) { return this.students.findOne(roll); }
}
@Module({ controllers: [StudentsController], providers: [StudentsService], exports: [StudentsService] })
export class StudentsModule {
}
