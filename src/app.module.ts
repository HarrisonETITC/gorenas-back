import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TyepOrmConfig } from '@config/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbProviders } from '@config/dbconfig';
import { UsuarioModule } from '@modules/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...TyepOrmConfig.getConfig(), autoLoadEntities: true }),
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...dbProviders
  ],
  exports: [
    ...dbProviders
  ]
})
export class AppModule { }
