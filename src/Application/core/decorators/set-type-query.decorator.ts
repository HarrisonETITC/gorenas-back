import { SetMetadata } from "@nestjs/common";

export const TYPED_QUERY = 'typed_query';
export const SetTypedQuery = <T>(...dto: T[]) => SetMetadata(TYPED_QUERY, dto);
