import { PersonaController } from '@controllers/persona.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaEntity } from '@orm/entities/persona.entity';
import { PersonaService } from '@services/persona.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonaEntity])
  ],
  controllers: [PersonaController],
  providers: [PersonaService]
})
export class PersonaModule { }
