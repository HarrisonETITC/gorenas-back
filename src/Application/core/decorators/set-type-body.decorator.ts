import { SetMetadata } from '@nestjs/common';

export const SetTypeBody = <T>(dto: T) => SetMetadata('typed_body', dto);
