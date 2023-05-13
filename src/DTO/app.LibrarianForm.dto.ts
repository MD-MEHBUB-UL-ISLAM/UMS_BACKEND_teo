import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, Length, Min, Max, IsDate } from "class-validator";



export class BookForm {   
   
   

    @IsNotEmpty({message: "Please enter your Book information"}) 

    bookname: string;
  
    takeinfo:string;
    authorname:string;






    studentid1:number;
   



}