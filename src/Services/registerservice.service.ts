import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentRegEntity } from "../Entity/registerentity.entity";
import { StudentRegForm } from "../DTO/registerform.dto";
import { StudentRegFormUpdate } from "../FormUpdate/registerformupdate.dto";
import { BookRegEntity } from "src/Entity/app.Librarian.entity";
import * as bcrypt from 'bcrypt';


@Injectable()
export class StudentRegService {
    constructor(
        @InjectRepository(StudentRegEntity)
        private studentregRepo: Repository<StudentRegEntity>,
     
 
      
      
        ) {}

getIndex():any { 
    return this.studentregRepo.find();

}
getUserByID(id):any {
    return this.studentregRepo.findOneBy({ id });
}

getUserByIDName(qry):any {
    return this.studentregRepo.findOneBy({ id:qry.id,name:qry.name });
}

    async insertUser(mydto):Promise<any> {
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(mydto.password, salt);
    mydto.password= hassedpassed;
     return this.studentregRepo.save(mydto);
      }

updateUser(name,email):any {
   
    return this.studentregRepo.update({email:email},{name:name});
    }
updateUserbyid(mydto:StudentRegFormUpdate,id):any {
    return this.studentregRepo.update(id,mydto);
       }
    deleteUserbyid(id):any {
    
        return this.studentregRepo.delete(id);
    }
    
    getManagersByAdminID(id):any {
        return this.studentregRepo.find({ 
                where: {id:id},
            relations: {
                courses: true,
            },
         });
    }

    getbooksByAdminID(id):any {
        return this.studentregRepo.find({ 
                where: {id:id},
            relations: {
              
                books:true,
            },
         });
    }
    
    getnotesByAdminID(id):any {
        return this.studentregRepo.find({ 
                where: {id:id},
            relations: {
              
                notes:true,
            },
         });
    }

    async signup(mydto) {
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(mydto.password, salt);
        mydto.password= hassedpassed;
        return this.studentregRepo.save(mydto);
        }
        
        async signin(mydto){
           
            if (mydto.email != null && mydto.password != null) {
                const mydata = await this.studentregRepo.findOneBy({ email: mydto.email });
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

}