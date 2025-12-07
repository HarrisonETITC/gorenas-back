import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SaleCreateDto {
    @ApiProperty({ 
        description: 'Sale amount',
        example: 45000.50,
        minimum: 0
    })
    amount: number;

    @ApiProperty({ 
        description: 'Payment method used',
        example: 'efectivo',
        enum: ['debito', 'credito', 'transferencia', 'plataformas', 'efectivo']
    })
    paymenthMethod: string;

    @ApiPropertyOptional({ 
        description: 'Sale creation date',
        example: '2025-01-01T10:30:00.000Z'
    })
    created?: Date;

    @ApiPropertyOptional({ 
        description: 'Last modification date',
        example: '2025-01-01T10:30:00.000Z'
    })
    modified?: Date;

    @ApiProperty({ 
        description: 'Employee ID who made the sale',
        example: '1'
    })
    employee: string;
}