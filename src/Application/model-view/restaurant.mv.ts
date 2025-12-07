import { ApiProperty } from '@nestjs/swagger';

export class RestaurantModelView {
    @ApiProperty({ 
        description: 'Restaurant ID',
        example: 1
    })
    id: number;

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

    @ApiProperty({ 
        description: 'Number of branches',
        example: 5
    })
    branches: number;
}