import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EmployeeModelView {
    @ApiProperty({ 
        description: 'Employee ID',
        example: 1
    })
    id: number;

    @ApiProperty({ 
        description: 'Employee full name',
        example: 'John Doe'
    })
    name: string;

    @ApiProperty({ 
        description: 'Employee user email',
        example: 'employee@example.com'
    })
    user: string;

    @ApiProperty({ 
        description: 'Branch address where employee works',
        example: 'Av. Principal #123-45'
    })
    branch: string;

    @ApiProperty({ 
        description: 'Number of sales made',
        example: 45
    })
    sales: number;

    @ApiProperty({ 
        description: 'Total amount of sales',
        example: 2500000.50
    })
    salesAmmounth: number;

    // Fields for edition
    @ApiPropertyOptional({ 
        description: 'Employee monthly salary (for edition)',
        example: 2500000
    })
    salary?: number;

    @ApiPropertyOptional({ 
        description: 'Employee state (for edition)',
        example: 'ACTIVE'
    })
    state?: string;
}