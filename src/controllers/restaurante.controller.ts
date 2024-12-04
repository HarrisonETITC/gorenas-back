import { JwtGuard } from '@complements/guards/jwt.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { RestauranteService } from '@services/restaurante.service';

@Controller('restaurante')
@UseGuards(JwtGuard)
export class RestauranteController {
    constructor(
        private readonly restauranteService: RestauranteService
    ) { }

    @Get('disponibles')
    async restaurantesDisponibles() {
        return (await this.restauranteService.buscarDisponibles()).map((res) => {
            return {
                nombre: 'Gorenas Centro',
                ...res
            }
        })
    }
}
