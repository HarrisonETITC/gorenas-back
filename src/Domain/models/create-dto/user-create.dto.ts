import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserCreateDto {
    @ApiProperty({ 
        description: 'User email address',
        example: 'user@example.com'
    })
    email: string;

    @ApiProperty({ 
        description: 'User password',
        example: 'SecurePass123!'
    })
    password: string;

    @ApiPropertyOptional({ 
        description: 'User account state',
        example: 'ACTIVE',
        default: 'ACTIVE'
    })
    state?: string;

    @ApiPropertyOptional({ 
        description: 'Account creation date',
        example: '2025-01-01T00:00:00.000Z'
    })
    created?: Date;
}