import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RoleModelView {
    @ApiProperty({ 
        description: 'Role ID',
        example: 1
    })
    id: number;

    @ApiProperty({ 
        description: 'Role name',
        example: 'Manager'
    })
    name: string;

    @ApiProperty({ 
        description: 'Role state',
        example: 'ACTIVE'
    })
    state: string;

    @ApiPropertyOptional({ 
        description: 'Number of users with this role',
        example: 5
    })
    users?: number;
}