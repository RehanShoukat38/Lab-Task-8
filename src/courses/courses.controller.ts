import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { ReplaceCourseDto, PatchCourseDto } from './dto/update-course.dto';
import { QueryCourseDto } from './dto/query-course.dto';
import { CodeParamDto } from './dto/code-param.dto';
@Controller('courses')
export class CoursesController {
    constructor(private readonly courses: CoursesService) { }
    @Get()
    list(
    @Query()
    q: QueryCourseDto) { return this.courses.findAll(q); }
    @Get('stats')
    stats() { return this.courses.stats(); }
    @Get(':code')
    one(
    @Param()
    p: CodeParamDto) { return this.courses.findOne(p.code); }
    @Post()
    create(
    @Body()
    dto: CreateCourseDto) { return this.courses.create(dto); }
    @Put(':code')
    replace(
    @Param()
    p: CodeParamDto, 
    @Body()
    dto: ReplaceCourseDto) { return this.courses.update(p.code, dto, true); }
    @Patch(':code')
    patch(
    @Param()
    p: CodeParamDto, 
    @Body()
    dto: PatchCourseDto) { return this.courses.update(p.code, dto); }
    @Delete(':code')
    @HttpCode(204)
    remove(
    @Param()
    p: CodeParamDto) { this.courses.remove(p.code); }
}
