import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentRegController } from "../Controller/registeer.controller"
import { StudentRegService } from "../Services/registerservice.service"
import { StudentRegEntity } from "../Entity/registerentity.entity"
import { CourseService } from "src/Services/course.service";
import { CourseEntity } from "src/Entity/course.entity";


import { BookService } from "src/Services/app.LibrarianService";
import { BookRegEntity } from "src/Entity/app.Librarian.entity";
import { NoteEntity } from "src/Entity/app.Notes.entity";
import { NoteService } from "src/Services/app.NotesService";

@Module({
imports: [
  
      
    TypeOrmModule.forFeature([StudentRegEntity, CourseEntity,BookRegEntity,NoteEntity])],
controllers: [StudentRegController],
providers: [StudentRegService,CourseService,BookService,NoteService],

})

export class StudentRegModule {}