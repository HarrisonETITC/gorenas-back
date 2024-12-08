import { AuthManagerAdapter } from "@Application/adapters/auth/auth-manager.adapter";
import { BcryptEncrypter } from "@Application/adapters/auth/bcrypt-encrypter.adapter";
import { JwtServiceAdapter } from "@Application/adapters/auth/jwt-service.adapter";
import { AUTH_MANAGER, AUTH_SERVICE, ENCRYPTER } from "@Application/config/inject-tokens/auth.tokens";
import { JwtStrategy } from "@complements/strategies/jwt.strategy";
import { LocalStrategy } from "@complements/strategies/local.strategy";
import { Provider } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

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
    }
]