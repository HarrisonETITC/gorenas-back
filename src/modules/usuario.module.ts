import { JwtStrategy } from '@complements/strategies/jwt.strategy';
import { LocalStrategy } from '@complements/strategies/local.strategy';
import { UsuarioController } from '@controllers/usuario.controller';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from '@orm/entities/usuario.entity';
import { JwtImplService } from '@services/jwt-impl.service';
import { UsuarioService } from '@services/usuario.service';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: `${process.env.JWT_SECRET ?? 'secret-jwt-kaskaks'}`
        }),
        TypeOrmModule.forFeature([UsuarioEntity])
    ],
    controllers: [UsuarioController],
    providers: [UsuarioService, JwtService, JwtImplService, LocalStrategy, JwtStrategy]
})
export class UsuarioModule { }
