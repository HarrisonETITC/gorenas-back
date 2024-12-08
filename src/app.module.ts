import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TyepOrmConfig } from '@Infraestructure/orm/typeorm/config/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbProviders } from '@Infraestructure/orm/typeorm/config/dbconfig';
import { UsuarioModule } from '@modules/usuario.module';
import { PersonaModule } from '@modules/persona.module';
import { VentaModule } from '@modules/venta.module';
import { SucursalModule } from '@modules/sucursal.module';
import { RestauranteModule } from '@modules/restaurante.module';
import { RolModule as RM1 } from '@modules/rol.module';
import { EmpleadoModule } from '@modules/empleado.module';
import { UserModule } from '@Infraestructure/api/modules/user.module';
import { BranchModule } from '@Infraestructure/api/modules/branch.module';
import { EmployeeModule } from '@Infraestructure/api/modules/employee.module';
import { PersonModule } from '@Infraestructure/api/modules/person.module';
import { RestaurantModule } from '@Infraestructure/api/modules/restaurant.module';
import { RolModule } from '@Infraestructure/api/modules/rol.module';
import { SaleModule } from '@Infraestructure/api/modules/sale.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...TyepOrmConfig.getConfig(), autoLoadEntities: true }),
    /* UsuarioModule,
    PersonaModule,
    VentaModule,
    SucursalModule,
    RestauranteModule,
    RM1,
    EmpleadoModule,
 */
    BranchModule,
    EmployeeModule,
    PersonModule,
    RestaurantModule,
    RolModule,
    SaleModule,
    UserModule
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
