import { VALIDATION_SERVICE } from "@Application/config/inject-tokens/auth.tokens";
import { ValidationServicePort } from "@Application/ports/validation-service.port";
import { BadRequestException, CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { Observable } from "rxjs";
import { Request } from "express";

@Injectable()
export class ValidationInterceptor implements NestInterceptor {

    constructor(
        @Inject(VALIDATION_SERVICE) private readonly validationService: ValidationServicePort,
        private readonly reflector: Reflector
    ) { }

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const handler = context.getHandler();
        const req: Request = context.switchToHttp().getRequest();
        const dto: any = this.reflector.get<any>('typed_body', handler);

        if (await this.validationService.validateExistingSchema(dto)) {
            try {
                await this.validationService.validate(req.body, dto);
            } catch (error) {
                throw new BadRequestException(error.message)
            }
        }

        return next.handle();
    }
}