import { ApiProperty } from '@nestjs/swagger';

export type DataResponse<T> = {
    data: T;
}

export class DataResponseDto<T> {
    @ApiProperty({ description: 'Response data' })
    data: T;
}