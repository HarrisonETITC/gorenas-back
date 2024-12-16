import { SetMetadata } from '@nestjs/common';

export const TYPED_BODY = 'typed_body';
export const SetTypedBody = <T>(...dto: T[]) => SetMetadata(TYPED_BODY, dto);
