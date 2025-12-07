import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RestaurantUpdateDto {
    @ApiProperty({ 
        description: 'Restaurant ID',
        example: 1
    })
    id: number;

    @ApiPropertyOptional({ 
        description: 'Restaurant name',
        example: 'Gorenas Restaurant'
    })
    name?: string;

    @ApiPropertyOptional({ 
        description: 'Restaurant main address',
        example: 'Calle Principal #10-20'
    })
    address?: string;
}