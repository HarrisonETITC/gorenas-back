import { ApiProperty } from '@nestjs/swagger';

export class SaleModelView {
    @ApiProperty({ 
        description: 'Sale ID',
        example: 1
    })
    id: number;

    @ApiProperty({ 
        description: 'Sale amount',
        example: 45000.50
    })
    amount: number;

    @ApiProperty({ 
        description: 'Employee name who made the sale',
        example: 'John Doe'
    })
    employee: string;

    @ApiProperty({ 
        description: 'Branch address where sale was made',
        example: 'Av. Principal #123-45'
    })
    branch: string;

    @ApiProperty({ 
        description: 'Payment method used',
        example: 'CASH'
    })
    paymenthMethod: string;

    @ApiProperty({ 
        description: 'Sale creation date',
        example: '2025-01-01T10:30:00.000Z'
    })
    created: Date;
}