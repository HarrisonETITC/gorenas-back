
import { ROL_KEY } from '@Application/core/decorators/rol.decorator';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppUtil } from '@Application/core/utils/app.util';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Array<string>>(ROL_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (AppUtil.verifyEmpty(requiredRoles)) {
            return true;
        }
        const request: Request = context.getArgByIndex(0);
        const roles: Array<string> = [];
        roles.push((request?.headers.accept as string)?? 'none');
        roles.push(context.getArgs()[0].body?.currentRol ?? 'none');

        const resultado = requiredRoles.filter(r => roles.includes(r)).length > 0;

        if (!resultado)
            throw new UnauthorizedException(`El rol '${roles[0]}' no se encuentra autorizado para realizar esta acción`)

        return resultado;
    }
}
