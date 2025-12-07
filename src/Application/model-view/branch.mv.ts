import { ApiProperty } from '@nestjs/swagger';

export class BranchModelView {
    @ApiProperty({ 
        description: 'Branch ID',
        example: 1
    })
    id: number;

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

    @ApiProperty({ 
        description: 'Branch state',
        example: 'ACTIVE'
    })
    state: string;

    @ApiProperty({ 
        description: 'Branch total earnings',
        example: 1500000.50
    })
    earnings: number;

    @ApiProperty({ 
        description: 'Branch creation date',
        example: '2025-01-01T00:00:00.000Z'
    })
    created: Date;

    @ApiProperty({ 
        description: 'Restaurant name',
        example: 'Gorenas Restaurant'
    })
    restaurantName: string;
}