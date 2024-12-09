import { VALIDATION_SERVICE } from "@Application/config/inject-tokens/auth.tokens";
import { ValidationServicePort } from "@Application/ports/validation-service.port";
import { CallHandler, ExecutionContext, Inject, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

export class ValidationInterceptor implements NestInterceptor {

    constructor(
        @Inject(VALIDATION_SERVICE) private readonly validationService: ValidationServicePort
    ) { }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        throw new Error("Method not implemented.");
    }
}