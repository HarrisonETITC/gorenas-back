import { PersonEntity } from "@Infraestructure/orm/typeorm/entities/person.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonController } from "../controllers/person-controller.adapter";
import { PersonProviders } from "@Infraestructure/orm/typeorm/config/providers/person.providers";

@Module({
    imports: [
        TypeOrmModule.forFeature([PersonEntity])
    ],
    controllers: [PersonController],
    providers: PersonProviders.concat([]),
    exports: PersonProviders.concat([])
})
export class PersonModule { }