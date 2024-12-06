import { EmpleadoController } from '@controllers/empleado.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpleadoEntity } from '@orm/entities/empleado.entity';
import { EmpleadoService } from '@services/empleado.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([EmpleadoEntity])
    ],
    controllers: [EmpleadoController],
    providers: [EmpleadoService]
})
export class EmpleadoModule { }
