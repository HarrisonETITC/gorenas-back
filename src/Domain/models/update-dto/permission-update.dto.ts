import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PermissionUpdateDto {
    @ApiProperty({ 
        description: 'Permission ID',
        example: 1
    })
    id: number;

    @ApiPropertyOptional({ 
        description: 'Permission name in format module:action',
        example: 'users:create',
        pattern: '^[a-z]+:[a-z]+$'
    })
    name?: string;

    @ApiPropertyOptional({ 
        description: 'Role ID to assign this permission (as string)',
        example: '1'
    })
    roleId?: string;

    @ApiPropertyOptional({ 
        description: 'Permission creation date',
        example: '2025-01-01T00:00:00.000Z'
    })
    created?: Date;
}