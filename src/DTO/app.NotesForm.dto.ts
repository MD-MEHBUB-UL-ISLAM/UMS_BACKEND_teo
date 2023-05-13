import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, Length, Min, Max, IsDate } from "class-validator";


export class NoteForm {   
   
   

    @IsNotEmpty({message: "Please enter your Note information"}) 

    Notename: string;

    @IsNotEmpty({message: "Please enter teacher"}) 
  
    
 
    teachername:string;


 @IsNotEmpty({message: "Please enter your Note info"}) 

 Noteinfo:string;



 studentid2:number;
   



}