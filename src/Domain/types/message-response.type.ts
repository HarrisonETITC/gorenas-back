import { ApiProperty } from '@nestjs/swagger';

export type MessageResponse = {
    message: string;
}

export class MessageResponseDto {
    @ApiProperty({ 
        description: 'Response message',
        example: 'Operation completed successfully'
    })
    message: string;
}