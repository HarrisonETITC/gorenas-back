import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PersonUpdateDto {
    @ApiProperty({ 
        description: 'Person ID',
        example: 1
    })
    id: number;

    @ApiPropertyOptional({ 
        description: 'Person first name(s)',
        example: 'John'
    })
    names?: string;

    @ApiPropertyOptional({ 
        description: 'Person last name(s)',
        example: 'Doe'
    })
    surnames?: string;

    @ApiPropertyOptional({ 
        description: 'Identification number',
        example: '1234567890'
    })
    identification?: string;

    @ApiPropertyOptional({ 
        description: 'Type of identification document',
        example: 'C.C',
        enum: ['C.C', 'C.E', 'T.I']
    })
    typeIdentification?: string;

    @ApiPropertyOptional({ 
        description: 'Phone number',
        example: '+57 300 123 4567'
    })
    phoneNumber?: string;

    @ApiPropertyOptional({ 
        description: 'Blood type',
        example: 'O+',
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    })
    rh?: string;

    @ApiPropertyOptional({ 
        description: 'Residential address',
        example: 'Calle 123 #45-67'
    })
    address?: string;

    @ApiPropertyOptional({ 
        description: 'Date of birth',
        example: '1990-01-01'
    })
    born?: Date;

    @ApiPropertyOptional({ 
        description: 'Role ID (as string)',
        example: '1'
    })
    roleId?: string;

    @ApiPropertyOptional({ 
        description: 'User ID (as string)',
        example: '1'
    })
    userId?: string;
}