import { UserModelView } from "@Application/model-view/user.mv";
import { AuthServicePort } from "@Application/ports/auth/auth-service.port";
import { UserModel } from "@Domain/models/user.model";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { config } from "dotenv";

config();
@Injectable()
export class JwtServiceAdapter implements AuthServicePort {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    async generateToken(user: UserModelView): Promise<string> {
        const signed = { id: user.id, email: user.email, role: user.role };

        return await this.jwtService.signAsync(signed, { expiresIn: '1w', secret: process.env.JWT_SECRET });
    }

    async parseFromToken(token: string): Promise<UserModel> {
        throw new Error("Method not implemented.");
    }
}