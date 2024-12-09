import { AuthManagerAdapter } from "@Application/adapters/auth/auth-manager.adapter";
import { BcryptEncrypter } from "@Application/adapters/auth/bcrypt-encrypter.adapter";
import { JwtServiceAdapter } from "@Application/adapters/auth/jwt-service.adapter";
import { AUTH_MANAGER, AUTH_SERVICE, ENCRYPTER, VALIDATION_SERVICE, VALIDATOR } from "@Application/config/inject-tokens/auth.tokens";
import { JwtStrategy } from "@Application/api/strategies/jwt.strategy";
import { LocalStrategy } from "@Application/api/strategies/local.strategy";
import { Provider } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ValidationServiceAdapter } from "@Application/adapters/auth/validation-service.adapter";
import { ZodValidatorAdapter } from "@Infraestructure/api/validators/zod-validator.adapter";

export const AuthProviders: Array<Provider> = [
    JwtService,
    LocalStrategy,
    JwtStrategy,
    {
        provide: ENCRYPTER,
        useClass: BcryptEncrypter
    },
    {
        provide: AUTH_MANAGER,
        useClass: AuthManagerAdapter
    },
    {
        provide: AUTH_SERVICE,
        useClass: JwtServiceAdapter
    },
    {
        provide: VALIDATION_SERVICE,
        useClass: ValidationServiceAdapter
    },
    {
        provide: VALIDATOR,
        useClass: ZodValidatorAdapter
    }
]