import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TyepOrmConfig } from '@config/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbProviders } from '@config/dbconfig';
import { UsuarioModule } from '@modules/usuario.module';
import { PersonaModule } from '@modules/persona.module';
import { VentaModule } from '@modules/venta.module';
import { SucursalModule } from '@modules/sucursal.module';
import { RestauranteModule } from '@modules/restaurante.module';
import { RolModule } from '@modules/rol.module';
import { EmpleadoModule } from '@modules/empleado.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...TyepOrmConfig.getConfig(), autoLoadEntities: true }),
    UsuarioModule,
    PersonaModule,
    VentaModule,
    SucursalModule,
    RestauranteModule,
    RolModule,
    EmpleadoModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...dbProviders,
  ],
  exports: [
    ...dbProviders
  ]
})
export class AppModule { }
