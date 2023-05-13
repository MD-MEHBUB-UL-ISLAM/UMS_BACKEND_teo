import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { StudentController } from "../Controller/app.StudentController";
import { StudentService } from "../Services/app.StudentService";
import { StudentEntity } from "../Entity/app.StudentEntity.entity";

import { MailerModule } from "@nestjs-modules/mailer";




@Module({
imports: [
    MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
                   port: 465,
                
                   ignoreTLS: true,
                   secure: true,
                   auth: {
                    user: 'jibonislamxxx@gmail.com',
                    pass: 'oyohorucvvjrjqlw'
                   },
                  }
      }),
      
    TypeOrmModule.forFeature([StudentEntity])],
controllers: [StudentController],
providers: [StudentService],

})

export class StudentModule {}