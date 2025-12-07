import { ApiProperty } from '@nestjs/swagger';

export class UserModelView {
    @ApiProperty({ 
        description: 'User ID',
        example: 1
    })
    id: number;

    @ApiProperty({ 
        description: 'User email address',
        example: 'user@example.com'
    })
    email: string;

    @ApiProperty({ 
        description: 'User full name',
        example: 'John Doe'
    })
    name: string;

    @ApiProperty({ 
        description: 'User account state',
        example: 'ACTIVE'
    })
    state: string;

    @ApiProperty({ 
        description: 'User role name',
        example: 'Manager'
    })
    role: string;

    @ApiProperty({ 
        description: 'Number of permissions',
        example: 15
    })
    permissions: number;
}