import { ApiProperty } from '@nestjs/swagger';

export class PersonModelView {
    @ApiProperty({ 
        description: 'Person ID',
        example: 1
    })
    id: number;

    @ApiProperty({ 
        description: 'Person email address',
        example: 'person@example.com'
    })
    email: string;

    @ApiProperty({ 
        description: 'Person first name(s)',
        example: 'John'
    })
    names: string;

    @ApiProperty({ 
        description: 'Person last name(s)',
        example: 'Doe'
    })
    surnames: string;

    @ApiProperty({ 
        description: 'Identification number',
        example: '1234567890'
    })
    identification: string;

    @ApiProperty({ 
        description: 'Branch name where person works',
        example: 'Sucursal Centro'
    })
    branch: string;

    @ApiProperty({ 
        description: 'Role name',
        example: 'Manager'
    })
    role: string;
}