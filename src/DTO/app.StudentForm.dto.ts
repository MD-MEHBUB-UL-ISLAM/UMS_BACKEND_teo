
import { IsInt, IsNotEmpty ,IsEmail,Matches,IsBoolean, IsString} from "class-validator";
import { Transform } from "class-transformer";
export class StudentForm {   
   
   


   //@Transform(({ value }) => value.split(','))
    //@IsString()
    fullname:string;

  //@IsString()
    CGPA:string;

    @IsNotEmpty({message: "Please give student's email"})
    //@IsEmail()
    email: string;


 
  //@Matches(/^(?:(?:\+|00)88|01)?\d{11}$/gm, {message:"please enter valid phone number"})
  phone: string;


//@IsBoolean()
//@Transform(({ value }) => value === '1' || value === 'true')
isActive: boolean;

//@IsString()
info:string;

@IsNotEmpty({message: "Please give student's password"})
//@IsString()
password:string;

//@IsNotEmpty({message: "Please give student's photo"})
//@IsString()
filename: string;
 


}