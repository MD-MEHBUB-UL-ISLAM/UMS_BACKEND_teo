import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Session,
  UseGuards,
  Res
} from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CourseForm } from 'src/DTO/course.dto';
import { CourseService } from 'src/Services/course.service';
import { StudentRegForm } from '../DTO/registerform.dto';
import { StudentRegFormUpdate } from '../FormUpdate/registerformupdate.dto';
import { StudentRegService } from '../Services/registerservice.service';
import { BookService } from 'src/Services/app.LibrarianService';
import { BookForm } from 'src/DTO/app.LibrarianForm.dto';
import { NoteService } from 'src/Services/app.NotesService';
import { NoteForm } from 'src/DTO/app.NotesForm.dto';
import { SessionGuard } from 'src/SessionGuard/app.student.sessionguard';


@Controller('/reg')
export class StudentRegController {
  constructor(private studentService: StudentRegService,
    private courseService: CourseService,
    private bookService: BookService,
    private noteService:NoteService
    ) {}

  @Get('/index')
  getAdmin(): any {
    return this.studentService.getIndex();
  }
  @Get('/indexbook')
  getallBook(): any {
    return this.bookService.getIndex();
  }
  @Get('/indexnote')
  getallNote(): any {
    return this.noteService.getIndex();
  }

  @Get('/indexcourse')
  getallcourse(): any {
    return this.courseService.getIndex();
  }


  @Get('/findadmin/:id')
  getAdminByID(@Param('id', ParseIntPipe) id: number): any {
    return this.studentService.getUserByID(id);
  }
  @Get('/findbook/:id')
  getBookByID(@Param('id', ParseIntPipe) id: number): any {
    return this.bookService.getBookbyID(id);
  }
  @Get('/findnote/:id')
  getNoteByID(@Param('id', ParseIntPipe) id: number): any {
    return this.noteService.getNotebyID(id);
  }
  @Get('/findcourse/:id')
  getCourseByID(@Param('id', ParseIntPipe) id: number): any {
    return this.courseService.getCoursebyID(id);
  }


  @Get('/findadmin')
  getAdminByIDName(@Query() qry: any): any {
    return this.studentService.getUserByIDName(qry);
  }



  @Get('/findbook')
  getBook(@Query() qry: any): any {
    return this.bookService.getbook(qry);
  }

  @Post('/insertadmin')
  @UseInterceptors(FileInterceptor('myfile',
  {storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(null,Date.now()+file.originalname)
    }
  })
  }))
  insertAdmin(@Body() mydto:StudentRegForm,@UploadedFile(  new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 16000000 }),
      new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    ],
  }),) file: Express.Multer.File){
    
  
  mydto.filename = file.filename;  
  console.log(mydto)
  return this.studentService.insertUser(mydto);
  }
  

  @Put('/updateadmin/')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updateAdmin(@Session() session,@Body('name') name: string): any {
    console.log(session.email);
    return this.studentService.updateUser(name, session.email);
  }

  @Put('/updateadmin/:id')
  @UsePipes(new ValidationPipe())
  updateAdminbyid(
    @Body() mydto: StudentRegFormUpdate,
    @Param('id', ParseIntPipe) id: number,
  ): any {
    return this.studentService.updateUserbyid(mydto, id);
  }

  @Delete('/deleteadmin/:id')
  deleteAdminbyid(@Param('id', ParseIntPipe) id: number): any {
    return this.studentService.deleteUserbyid(id);
   
  }

  @Post('/insertcourse')
  @UsePipes(new ValidationPipe())
    insertManager(@Body() coursedto: CourseForm): any {
      return this.courseService.insertManager(coursedto);
    }

    @Post('/insertbook')
  @UsePipes(new ValidationPipe())
    insertbook(@Body() bookdto: BookForm): any {
      return this.bookService.insertbook(bookdto);
    }
    @Post('/insertnote')
  @UsePipes(new ValidationPipe())
    insertnote(@Body() notedto: NoteForm): any {
      return this.noteService.insertnote(notedto);
    }
    @Get('/findcoursesbyadmin/:id')
    getManagerByAdminID(@Param('id', ParseIntPipe) id: number): any {
      return this.studentService.getManagersByAdminID(id);
    }

    @Get('/findadminbycourse/:id')
    getAdminByManagerID(@Param('id', ParseIntPipe) id: number): any {
      return this.courseService.getAdminByManagerID(id);
    }



    @Get('/findadminbybook/:id')
    getAdminBybookID(@Param('id', ParseIntPipe) id: number): any {
      return this.bookService.getAdminBybookID(id);
    }

    @Get('/findnotesbyadmin/:id')
    getnoteByAdminID(@Param('id', ParseIntPipe) id: number): any {
      return this.studentService.getnotesByAdminID(id);
    }

    @Get('/findadminbynote/:id')
    getAdminBynoteID(@Param('id', ParseIntPipe) id: number): any {
      return this.noteService.getAdminBynoteID(id);
    }

    @Get('/getimage/:name')
    getImages(@Param('name') name, @Res() res) {
      res.sendFile(name,{ root: './uploads' })
    }
  

    @Post('/signup')
@UseInterceptors(FileInterceptor('myfile',
{storage:diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
  }
})

}))
signup(@Body() mydto:StudentRegForm,@UploadedFile(  new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 16000000 }),
    new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
  ],
}),) file: Express.Multer.File){

mydto.filename = file.filename;  
console.log(mydto)
return this.studentService.signup(mydto);

}
  @Post('/signin')
  @UsePipes(new ValidationPipe())
async signin(@Session() session, @Body() mydto:StudentRegForm)
  {
    const res = await (this.studentService.signin(mydto));
if(res==true)
{
  session.email = mydto.email;
  return (session.email);
}
else
{
  throw new UnauthorizedException({ message: "invalid credentials" });
}
}
@Get('/signout')
signout(@Session() session)
{
  if(session.destroy())
  {
    return {message:"you are logged out"};
  }
  else
  {
    throw new UnauthorizedException("invalid actions");
  }
}
   
  }