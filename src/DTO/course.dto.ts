import { IsNotEmpty, IsInt, Length, IsEmail } from "class-validator";

export class CourseForm {   
   

   @IsNotEmpty()
    Coursename: string;


    @Length(3,8)
Courseid: string;

 

    studentid:number;



}