import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RoleUpdateDto {
    @ApiProperty({ 
        description: 'Role ID',
        example: 1
    })
    id: number;

    @ApiPropertyOptional({ 
        description: 'Role name',
        example: 'Manager'
    })
    name?: string;

    @ApiPropertyOptional({ 
        description: 'Role state',
        example: 'ACTIVE'
    })
    state?: string
}