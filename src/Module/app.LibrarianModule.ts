import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookRegEntity } from "../Entity/app.Librarian.entity";




@Module({
imports: [TypeOrmModule.forFeature([BookRegEntity])],
controllers: [],
providers: [],

})

export class BookModule {}