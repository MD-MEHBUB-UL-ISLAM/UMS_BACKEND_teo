
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity("studentifo")
export class StudentEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname:string;

  @Column()
  CGPA:string;


  @Column()
  email: string;

  
  @Column()
  password: string;
  
  @Column()
  phone: string;

  @Column() 
  isActive: boolean;

  @Column()
  info:string;

  
  @Column()
  filename: string;


  



}