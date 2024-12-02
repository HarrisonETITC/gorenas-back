import { RolController } from '@controllers/rol.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolEntity } from '@orm/entities/rol.entity';
import { RolService } from '@services/rol.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([RolEntity])
    ],
    controllers: [RolController],
    providers: [RolService]

})
export class RolModule { }
