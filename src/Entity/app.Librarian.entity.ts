
import { StudentRegEntity } from 'src/Entity/registerentity.entity';

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';


@Entity("BOOKLIBRARYREGINFOTABLESTUDENTINFO1")
export class BookRegEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookname: string;
  

  @Column()
  takeinfo:string;
 

  @Column()
 
    authorname:string;
   


    @ManyToOne(()=> StudentRegEntity, (student) =>student.books, {
    cascade: true,
  })
    @JoinTable()

student: StudentRegEntity[]
   
}




