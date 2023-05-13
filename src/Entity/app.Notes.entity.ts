
import { StudentRegEntity } from 'src/Entity/registerentity.entity';

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToOne } from 'typeorm';


@Entity("NOTEFORSTUDENTONLY1")
export class NoteEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Notename: string;
  

  @Column()
  Noteinfo:string;
 

  @Column()
 
    teachername:string;
   


    @ManyToOne(() => StudentRegEntity, (student) =>student.notes , {
    cascade: true,
  })
    @JoinTable()

student: StudentRegEntity[]
   
}




