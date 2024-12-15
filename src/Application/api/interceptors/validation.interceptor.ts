import { VALIDATION_SERVICE } from "@Application/config/inject-tokens/auth.tokens";
import { ValidationServicePort } from "@Application/ports/validation-service.port";
import { BadRequestException, CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor, Type } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { Observable } from "rxjs";
import { Request } from "express";
import { TYPED_BODY } from "@Application/core/decorators/set-type-body.decorator";
import { TYPED_QUERY } from "@Application/core/decorators/set-type-query.decorator";
import { TYPED_PARAM } from "@Application/core/decorators/set-type-param.decorator";
import { AppUtil } from "@Application/core/utils/app.util";
import { UserModelView } from "@Application/model-view/user.mv";

@Injectable()
export class ValidationInterceptor implements NestInterceptor {

    constructor(
        @Inject(VALIDATION_SERVICE) private readonly validationService: ValidationServicePort,
        private readonly reflector: Reflector
    ) { }

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const handler = context.getHandler();
        const req: Request = context.switchToHttp().getRequest();
        const user = (req.user as UserModelView);
        const body: Array<Type<any>> = (this.reflector.get<any>(TYPED_BODY, handler) as Array<Type<any>>);
        const query: Array<Type<any>> = (this.reflector.get<any>(TYPED_QUERY, handler) as Array<Type<any>>);
        const param: Array<Type<any>> = (this.reflector.get<any>(TYPED_PARAM, handler) as Array<Type<any>>);
        const total = [body, query, param];
        const names = [TYPED_BODY, TYPED_QUERY, TYPED_PARAM];

        if (AppUtil.verifyEmpty(req.query))
            req.query = {};
        req.query['role'] = user.role;

        for (let i = 0; i < total.length; i++) {
            const types = total[i];
            const name = names[i];

            if (AppUtil.verifyEmpty(types))
                continue;

            await this.findErrorsOnTypes(req, types, this.findData(req, name));
        }

        return next.handle();
    }

    private async findErrorsOnTypes(req: Request, types: Array<Type<any>>, data: any) {
        for (const single of types) {
            if (!AppUtil.verifyEmpty(single) && (await this.validationService.validateExistingSchema(single))) {
                try {
                    await this.validationService.validate(data, single);
                } catch (error) {
                    throw new BadRequestException(error.message)
                }
            }
        }
    }

    private findData(req: Request, name: string) {
        if (name == TYPED_BODY)
            return req.body;
        if (name == TYPED_QUERY)
            return req.query;
        if (name == TYPED_PARAM)
            return req.params;

        return {};
    }
}