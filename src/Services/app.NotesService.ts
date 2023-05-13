import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteEntity } from "../Entity/app.Notes.entity";
import { NoteForm } from "../DTO/app.NotesForm.dto";



@Injectable()
export class NoteService {
    constructor(
        @InjectRepository(NoteEntity)
        private noteRepo: Repository<NoteEntity>,
      ) {}


insertnote(mydto:NoteForm):any {
    
   return this.noteRepo.save(mydto);
      }

      getNotebyID(id):any {
        return this.noteRepo.findOneBy({ id });
    }

    getIndex():any { 
      return this.noteRepo.find();
  
  }
      getAdminBynoteID(id):any {
        return this.noteRepo.find({ 
                where: {id:id},
            relations: {
                student: true,
            },
         });
    }

}