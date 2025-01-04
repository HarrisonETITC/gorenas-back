import { TYPED_QUERY } from "@Application/core/decorators/set-type-query.decorator";
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Type } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Request } from "express";
import { ValuesSearchParams } from "@Application/core/params/search/values-search.params";
import { AppUtil } from "@Application/core/utils/app.util";

@Injectable()
export class TransformDataInterceptor implements NestInterceptor {
    constructor(
        private readonly reflector: Reflector
    ) { }

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const handler = context.getHandler();
        const req: Request = context.switchToHttp().getRequest();
        const query: Array<Type<any>> = (this.reflector.get<any>(TYPED_QUERY, handler) as Array<Type<any>>);

        if (!AppUtil.verifyEmpty(query) && !AppUtil.verifyEmpty(query.find(type => type === ValuesSearchParams))
            && !AppUtil.verifyEmpty(req.query) && !AppUtil.verifyEmpty(req.query['values'])) {
            req.query['values'] = (req.query['values'] as string).split(',');
        }

        return next.handle();
    }
}
