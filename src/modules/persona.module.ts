import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaEntity } from '@orm/entities/persona.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonaEntity])
  ]
})
export class PersonaModule {}
