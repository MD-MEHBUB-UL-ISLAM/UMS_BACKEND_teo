import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseForm } from "../DTO/course.dto";

import { CourseEntity } from "../Entity/course.entity";


@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(CourseEntity)
        private courseRepo: Repository<CourseEntity>,
      ) {}
      getCoursebyID(id):any {
        return this.courseRepo.findOneBy({ id });
    }

    getIndex():any { 
        return this.courseRepo.find();
    
    }

insertManager(mydto:CourseForm):any {
    
   return this.courseRepo.save(mydto);
      }
      getAdminByManagerID(id):any {
        return this.courseRepo.find({ 
                where: {id:id},
            relations: {
                student: true,
            },
         });
    }

}