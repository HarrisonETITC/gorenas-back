import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EmployeeUpdateDto {
    @ApiProperty({ 
        description: 'Employee ID',
        example: 1
    })
    id: number;

    @ApiPropertyOptional({ 
        description: 'Employee monthly salary',
        example: 2500000,
        minimum: 0
    })
    salary?: number;

    @ApiPropertyOptional({ 
        description: 'Employee state',
        example: 'ACTIVE'
    })
    state?: string;

    @ApiPropertyOptional({ 
        description: 'Branch ID where employee works (as string)',
        example: '1'
    })
    branchId?: string;

    @ApiPropertyOptional({ 
        description: 'Person ID associated with this employee (as string)',
        example: '1'
    })
    personId?: string;
}