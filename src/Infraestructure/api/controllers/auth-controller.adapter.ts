import { ROUTE_AUTH } from "@Application/api/api.routes";
import { LocalGuard } from "@Application/api/guards/local.guard";
import { AUTH_SERVICE, ENCRYPTER } from "@Application/config/inject-tokens/auth.tokens";
import { UserModelView } from "@Application/model-view/user.mv";
import { AuthControllerPort } from "@Application/ports/auth/auth-controller.port";
import { AuthServicePort } from "@Application/ports/auth/auth-service.port";
import { EncrypterPort } from "@Application/ports/encrypter.port";
import { UserModel } from "@Domain/models/user.model";
import { AuthResponse } from "@Domain/types/auth-response.type";
import { Controller, Get, Inject, Post, Query, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller(ROUTE_AUTH)
export class AuthController implements AuthControllerPort {

    constructor(
        @Inject(AUTH_SERVICE)
        private readonly authService: AuthServicePort,
        @Inject(ENCRYPTER)
        private readonly encrypter: EncrypterPort
    ) { }

    @Post('authenticate')
    @ApiOperation({ 
        summary: 'Authenticate user and get JWT token',
        description: 'Authenticates a user using username (email) and password. Returns a JWT token for subsequent authenticated requests.'
    })
    @ApiBody({ 
        schema: {
            type: 'object',
            required: ['username', 'password'],
            properties: {
                username: { 
                    type: 'string', 
                    example: 'user@example.com',
                    description: 'User email address (used as username)'
                },
                password: { 
                    type: 'string', 
                    example: 'password123',
                    description: 'User password'
                }
            }
        }
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Authentication successful. Returns JWT token and user ID.', 
        schema: {
            type: 'object',
            properties: {
                token: { 
                    type: 'string',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    description: 'JWT token for authentication'
                },
                userId: { 
                    type: 'number',
                    example: 1,
                    description: 'ID of the authenticated user'
                }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Invalid credentials. Username or password is incorrect.' })
    @ApiResponse({ status: 400, description: 'Bad request. Missing username or password.' })
    @UseGuards(LocalGuard)
    async authenticate(@Req() req: Request): Promise<AuthResponse> {
        const user = (req.user as UserModelView);

        return {
            token: await this.authService.generateToken(user),
            userId: user.id
        }
    }

    @Get('get-hash')
    @ApiOperation({ summary: 'Generate hash from plain text' })
    @ApiQuery({ name: 'data', required: true, type: String, description: 'Plain text to hash' })
    @ApiResponse({ status: 200, description: 'Hash generated successfully' })
    async getHash(
        @Query('data') data: string
    ) {
        return { hashed: await this.encrypter.encrypt(data) }
    }

    createUser(newUser: UserModel): Promise<UserModelView> {
        throw new Error("Method not implemented.");
    }
}