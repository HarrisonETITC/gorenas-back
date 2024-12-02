
import { ROL_KEY } from '@complements/decoradores/rol.decorator';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppUtil } from '@utils/app.util';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Array<string>>(ROL_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (AppUtil.verificarVacio(requiredRoles)) {
            return true;
        }
        const rol = context.getArgs()[0].body?.currentRol ?? 'none';
        const resultado = requiredRoles.filter(r => r == rol).length > 0

        if (!resultado)
            throw new UnauthorizedException(`El rol '${rol}' no se encuentra autorizado para realizar esta acción`)

        return resultado;
    }
}
