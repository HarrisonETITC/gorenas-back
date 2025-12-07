import { ApiProperty } from '@nestjs/swagger';

export class RestaurantCreateDto {
    @ApiProperty({ 
        description: 'Restaurant name',
        example: 'Gorenas Restaurant'
    })
    name: string;

    @ApiProperty({ 
        description: 'Restaurant main address',
        example: 'Calle Principal #10-20'
    })
    address: string;
}