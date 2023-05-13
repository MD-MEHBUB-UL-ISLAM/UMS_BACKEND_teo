import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NoteEntity } from "../Entity/app.Notes.entity";





@Module({
imports: [TypeOrmModule.forFeature([NoteEntity])],
controllers: [],
providers: [],

})

export class NoteModule {}