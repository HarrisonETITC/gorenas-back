import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserUpdateDto {
    @ApiProperty({ 
        description: 'User ID',
        example: 1
    })
    id: number;

    @ApiPropertyOptional({ 
        description: 'User email address',
        example: 'user@example.com'
    })
    email?: string;

    @ApiPropertyOptional({ 
        description: 'New password',
        example: 'NewSecurePass123!'
    })
    password?: string;

    @ApiPropertyOptional({ 
        description: 'User account state',
        example: 'ACTIVE'
    })
    state?: string;

    @ApiPropertyOptional({ 
        description: 'Account creation date',
        example: '2025-01-01T00:00:00.000Z'
    })
    created?: Date;

    @ApiPropertyOptional({ 
        description: 'Current password for verification',
        example: 'OldPassword123!'
    })
    oldPassword?: string;
}