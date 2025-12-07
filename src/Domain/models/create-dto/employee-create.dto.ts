import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EmployeeCreateDto {
    @ApiProperty({ 
        description: 'Employee monthly salary',
        example: 2500000,
        minimum: 0
    })
    salary: number;

    @ApiPropertyOptional({ 
        description: 'Employee state',
        example: 'ACTIVE',
        default: 'ACTIVE'
    })
    state?: string;

    @ApiProperty({ 
        description: 'Branch ID where employee works (as string)',
        example: '1'
    })
    branchId: string;

    @ApiProperty({ 
        description: 'Person ID associated with this employee (as string)',
        example: '1'
    })
    personId: string;
}