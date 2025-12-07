import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PermissionCreateDto {
    @ApiProperty({ 
        description: 'Permission name in format module:action',
        example: 'users:create',
        pattern: '^[a-z]+:[a-z]+$'
    })
    name: string;

    @ApiProperty({ 
        description: 'Role ID to assign this permission',
        example: 1
    })
    roleId: number;

    @ApiPropertyOptional({ 
        description: 'Permission creation date',
        example: '2025-01-01T00:00:00.000Z'
    })
    created?: Date;
}