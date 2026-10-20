import { readFileSync, writeFileSync, renameSync } from 'node:fs';
import { Course } from '../course.entity';
export const COURSE_STORE = Symbol('COURSE_STORE');
export interface CourseStore {
    readAll(): Course[];
    writeAll(courses: Course[]): void;
}
export class InMemoryCourseStore implements CourseStore {
    constructor(private courses: Course[] = []) { this.courses = structuredClone(courses); }
    readAll() { return structuredClone(this.courses); }
    writeAll(courses: Course[]) { this.courses = structuredClone(courses); }
}
export class JsonFileCourseStore implements CourseStore {
    constructor(private readonly path: string) { }
    readAll(): Course[] { return JSON.parse(readFileSync(this.path, 'utf8')); }
    writeAll(courses: Course[]) { writeFileSync(this.path + '.tmp', JSON.stringify(courses, null, 2) + '\n'); renameSync(this.path + '.tmp', this.path); }
}
