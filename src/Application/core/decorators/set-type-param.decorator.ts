import { SetMetadata } from "@nestjs/common";

export const TYPED_PARAM = 'typed_param';
export const SetTypedParam = <T>(...dto: T[]) => SetMetadata(TYPED_PARAM, dto);
