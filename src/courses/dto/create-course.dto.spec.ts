import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateCourseDto } from './create-course.dto';
const valid = { code: ' cs-420 ', title: ' Compilers ', creditHours: 3, instructor: ' Dr. Hamza ', department: 'Computer Science', tags: ['Theory', 'CORE'] };
const check = (value: object) => validate(plainToInstance(CreateCourseDto, value), { whitelist: true, forbidNonWhitelisted: true });
describe('CreateCourseDto', () => {
    it('accepts valid data', async () => expect(await check(valid)).toHaveLength(0));
    it('cleans values', () => expect(plainToInstance(CreateCourseDto, valid)).toMatchObject({ code: 'CS-420', title: 'Compilers', instructor: 'Dr. Hamza', tags: ['theory', 'core'] }));
    it.each([['code', 'CS3'], ['title', 'AI'], ['creditHours', 9], ['creditHours', '3'], ['creditHours', 1.5], ['instructor', 'A'], ['department', 'Unknown'], ['description', 'a'.repeat(201)], ['tags', ['a', 'b', 'c', 'd', 'e', 'f']], ['tags', [1]], ['tags', 'theory']])('rejects invalid %s: %s', async (field, value) => expect((await check({ ...valid, [field]: value })).some(e => e.property === field)).toBe(true));
    it('rejects extra properties', async () => expect((await check({ ...valid, isAdmin: true }))[0].property).toBe('isAdmin'));
});
