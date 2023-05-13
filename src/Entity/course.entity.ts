import { StudentRegEntity } from 'src/Entity/registerentity.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity("COURSETABLEFORSTUDENT1")
export class CourseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Coursename: string;



 

  @Column()
  Courseid: string;

  @ManyToOne(() => StudentRegEntity, (student) => student.courses)
    student: StudentRegEntity

}