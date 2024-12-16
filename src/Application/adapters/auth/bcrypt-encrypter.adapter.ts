import { EncrypterPort } from "@Application/ports/encrypter.port";
import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { config } from "dotenv";

config()
@Injectable()
export class BcryptEncrypter implements EncrypterPort {
    async encrypt(data: string): Promise<string> {
        return await bcrypt.hash(data, Number(process.env.SALT_ROUNDS ?? '1'));
    }
    async compare(data: string, encrypted: string): Promise<boolean> {
        return await bcrypt.compare(data, encrypted);
    }
}