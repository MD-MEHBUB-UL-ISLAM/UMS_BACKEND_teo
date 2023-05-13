import { IsNotEmpty, IsInt, Length, IsEmail } from "class-validator";

export class StudentRegForm {   
   

    name: string;
   

    @IsNotEmpty()
    email: string;


    @IsNotEmpty()
    password: string;

    address: string;

    filename:string;



}