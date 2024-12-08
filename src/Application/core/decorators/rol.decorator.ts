
import { SetMetadata } from '@nestjs/common';

export const ROL_KEY = 'rol';
export const Roles = (...roles: string[]) => SetMetadata(ROL_KEY, roles);
