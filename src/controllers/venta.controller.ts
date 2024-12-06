import { JwtGuard } from '@complements/guards/jwt.guard';
import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { VentaEntity } from '@orm/entities/venta.entity';
import { VentaService } from '@services/venta.service';

@Controller('venta')
@UseGuards(JwtGuard)
export class VentaController {
    constructor(
        private readonly ventaService: VentaService
    ) { }

    @Get('mostrar')
    async ventasMostrar(
        @Query('userId') usuarioId: string,
        @Query('rol') rol: string
    ) {
        return await this.ventaService.getVentasMostrar(parseInt(usuarioId), rol);
    }

    @Post('crear')
    async crearVenta(@Body() venta: VentaEntity) {
        return await this.ventaService.crear(venta);
    }

    @Put('actualizar')
    async actualizarVenta(@Body() act: VentaEntity) {
        return await this.ventaService.modificar(act.id, act);
    }

    @Get('id')
    async getVentaById(
        @Query('ventaId') id: string
    ) {
        return await this.ventaService.buscarPorId(parseInt(id));
    }
}
