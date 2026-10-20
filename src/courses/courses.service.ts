import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../common/logger';
import { COURSE_STORE, CourseStore } from './store/course-store';
import { CreditService } from './credit.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { QueryCourseDto } from './dto/query-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
@Injectable()
export class CoursesService {
    constructor(
    @Inject(COURSE_STORE)
    private readonly store: CourseStore, private readonly credits: CreditService, private readonly logger: AppLogger) { }
    findAll(q: QueryCourseDto = {}) { let rows = this.store.readAll(); if (q.search)
        rows = rows.filter(c => [c.code, c.title, c.instructor].some(v => v.toLowerCase().includes(q.search!.toLowerCase()))); if (q.department)
        rows = rows.filter(c => c.department === q.department); if (q.minCredits !== undefined)
        rows = rows.filter(c => c.creditHours >= q.minCredits!); if (q.sort)
        rows.sort((a, b) => (a.creditHours - b.creditHours) * (q.order === 'desc' ? -1 : 1)); return q.limit === undefined ? rows : rows.slice(0, q.limit); }
    findOne(code: string) { const c = this.store.readAll().find(c => c.code === code); if (!c)
        throw new NotFoundException('Course not found'); return c; }
    stats() { const rows = this.store.readAll(); const totalCredits = this.credits.totalCredits(rows); return { totalCourses: rows.length, totalCredits, overloaded: this.credits.isOverloaded(totalCredits) }; }
    create(dto: CreateCourseDto) { const rows = this.store.readAll(); if (rows.some(c => c.code === dto.code))
        throw new ConflictException('Course code already exists'); rows.push({ ...dto }); this.store.writeAll(rows); this.logger.log(`Created course ${dto.code}`); return dto; }
    update(code: string, dto: UpdateCourseDto, replace = false) { this.findOne(code); const rows = this.store.readAll(); const i = rows.findIndex(c => c.code === code); rows[i] = replace ? { ...dto, code } as typeof rows[number] : { ...rows[i], ...dto, code }; this.store.writeAll(rows); return rows[i]; }
    remove(code: string) { this.findOne(code); this.store.writeAll(this.store.readAll().filter(c => c.code !== code)); this.logger.log(`Deleted course ${code}`); }
}
