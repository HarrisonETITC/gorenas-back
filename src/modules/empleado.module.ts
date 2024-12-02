import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpleadoEntity } from '@orm/entities/empleado.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([EmpleadoEntity])
    ],
    controllers: []
})
export class EmpleadoModule { }
