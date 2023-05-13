import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseEntity } from "../Entity/course.entity";



@Module({
imports: [TypeOrmModule.forFeature([CourseEntity])],
controllers: [],
providers: [],

})

export class CourseModule {}