import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
export class ReplaceCourseDto extends OmitType(CreateCourseDto, ['code'] as const) {
}
export class UpdateCourseDto extends PartialType(OmitType(CreateCourseDto, ['code'] as const)) {
}
export class PatchCourseDto extends PartialType(UpdateCourseDto) {
}
