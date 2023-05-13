import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StudentEntity } from "../Entity/app.StudentEntity.entity";
import { StudentForm } from "../DTO/app.StudentForm.dto";
import { StudentFormUpdate } from "../FormUpdate/app.studentformupdate";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer/dist";

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(StudentEntity)
        private studentRepo: Repository<StudentEntity>,
        private mailerService: MailerService
      
        ) {}

getIndex():any { 
    return this.studentRepo.find();

}
async getUserByID(id) {
    const data=await this.studentRepo.findOneBy({ id });
    console.log(data);
    if(data!==null) {
        return data;
    }
   else 
   {
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
   }
}

getUserByIDName(qry):any {
    return this.studentRepo.findOneBy({ id:qry.id,fullname:qry.fullname });
}

async insertUser(mydto) {
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(mydto.password, salt);
    mydto.password= hassedpassed;
     return this.studentRepo.save(mydto);
}

    

updateUser(fullname,email):any {
   
    return this.studentRepo.update({email:email},{fullname:fullname});
    }
updateUserbyid(mydto:StudentFormUpdate,id):any {
    return this.studentRepo.update(id,mydto);
       }
    deleteUserbyid(id):any {
    
        return this.studentRepo.delete(id);
    }
    

    
    async signup(mydto) {
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(mydto.password, salt);
        mydto.password= hassedpassed;
        return this.studentRepo.save(mydto);
        }
        
        async signin(mydto){
            if (mydto.email != null && mydto.password != null) {
                const mydata = await this.studentRepo.findOneBy({ email: mydto.email });
                const isMatch = await bcrypt.compare(mydto.password, mydata.password);
                if (isMatch) {
                    return true;
                }
                else {
                    return false;
                }
            } else {
                return false;
            }
        
        }
        
        async sendEmail(mydata){
         return   await this.mailerService.sendMail({
                
                to: mydata.email,
                subject: mydata.subject,
                text: mydata.text, 
              });
        
        }

        


}
