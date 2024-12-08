import { PersonEntity } from "@Infraestructure/orm/typeorm/entities/person.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([PersonEntity])
    ]
})
export class PersonModule {}