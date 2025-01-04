import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TyepOrmConfig } from '@Infraestructure/orm/typeorm/config/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbProviders } from '@Infraestructure/orm/typeorm/config/dbconfig';
import { UserModule } from '@Infraestructure/api/modules/user.module';
import { BranchModule } from '@Infraestructure/api/modules/branch.module';
import { EmployeeModule } from '@Infraestructure/api/modules/employee.module';
import { PersonModule } from '@Infraestructure/api/modules/person.module';
import { RestaurantModule } from '@Infraestructure/api/modules/restaurant.module';
import { RoleModule } from '@Infraestructure/api/modules/role.module';
import { SaleModule } from '@Infraestructure/api/modules/sale.module';
import { AuthModule } from '@Infraestructure/api/modules/auth.module';
import { PermissionModule } from '@Infraestructure/api/modules/permission.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...TyepOrmConfig.getConfig(), autoLoadEntities: true }),
    BranchModule,
    EmployeeModule,
    PersonModule,
    RestaurantModule,
    RoleModule,
    SaleModule,
    UserModule,
    AuthModule,
    PermissionModule
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
export class AppModule {
}
