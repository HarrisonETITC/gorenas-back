import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class ParseQueryParamsMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: Error | any) => void) {
        if (req.query) {
            for (const key in req.query) {
                if (typeof req.query[key] === 'string') {
                    req.query[key] = decodeURIComponent(req.query[key]);
                }
            }
        }

        next();
    }
}
