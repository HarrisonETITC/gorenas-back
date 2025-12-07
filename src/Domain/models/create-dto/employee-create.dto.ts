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
        description: 'Branch ID where employee works',
        example: 1
    })
    branchId: number;

    @ApiProperty({ 
        description: 'Person ID associated with this employee',
        example: 1
    })
    personId: number;
}