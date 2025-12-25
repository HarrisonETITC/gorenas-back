import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BranchUpdateDto {
    @ApiProperty({ 
        description: 'Branch ID',
        example: 1
    })
    id: number;

    @ApiPropertyOptional({ 
        description: 'Branch name',
        example: 'Sucursal Centro'
    })
    name?: string;

    @ApiPropertyOptional({ 
        description: 'Branch address',
        example: 'Av. Principal #123-45'
    })
    address?: string;

    @ApiPropertyOptional({ 
        description: 'Branch earnings',
        example: 1500000.50,
        minimum: 0
    })
    earnings?: number;

    @ApiPropertyOptional({ 
        description: 'Branch state',
        example: 'ACTIVE'
    })
    state?: string;

    @ApiPropertyOptional({ 
        description: 'Restaurant ID',
        example: '1'
    })
    restaurantId?: number;
}