import { Injectable } from '@nestjs/common';
import { Course } from './course.entity';
@Injectable()
export class CreditService {
    totalCredits(courses: Course[]) { return courses.reduce((sum, c) => sum + c.creditHours, 0); }
    isOverloaded(totalCredits: number) { return totalCredits > 18; }
}
