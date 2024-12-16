import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppUtil } from '@Application/core/utils/app.util';
import { Request } from 'express';
import { Roles } from '@Application/core/decorators/role.decorator';
import { UserModelView } from '@Application/model-view/user.mv';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get(Roles, context.getHandler());
        if (AppUtil.verifyEmpty(requiredRoles)) {
            return true;
        }
        const req: Request = context.getArgByIndex(0);
        const role = (req.user as UserModelView)?.role ?? '';

        if (!requiredRoles.includes(role))
            throw new UnauthorizedException(`El rol '${role}' no se encuentra autorizado para realizar esta acción`)

        return true;
    }
}
