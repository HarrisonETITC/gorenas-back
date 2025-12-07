import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BranchCreateDto {
    @ApiProperty({ 
        description: 'Branch name',
        example: 'Sucursal Centro'
    })
    name: string;

    @ApiProperty({ 
        description: 'Branch address',
        example: 'Av. Principal #123-45'
    })
    address: string;

    @ApiPropertyOptional({ 
        description: 'Branch earnings',
        example: 1500000.50,
        minimum: 0
    })
    earnings?: number;

    @ApiPropertyOptional({ 
        description: 'Branch state',
        example: 'ACTIVE',
        default: 'ACTIVE'
    })
    state?: string;

    @ApiProperty({ 
        description: 'Restaurant ID as string',
        example: '1'
    })
    restaurant: string;
}