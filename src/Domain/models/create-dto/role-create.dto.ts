import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RoleCreateDto {
    @ApiProperty({ 
        description: 'Role name',
        example: 'Manager',
        minLength: 3,
        maxLength: 50
    })
    name: string;

    @ApiPropertyOptional({ 
        description: 'Role state',
        example: 'ACTIVE',
        default: 'ACTIVE'
    })
    state?: string
}