import { JwtGuard } from '@complements/guards/jwt.guard';
import { Controller, UseGuards } from '@nestjs/common';
import { VentaService } from '@services/venta.service';

@Controller('venta')
@UseGuards(JwtGuard)
export class VentaController {
    constructor(
        private readonly ventaService: VentaService
    ) { }
}
