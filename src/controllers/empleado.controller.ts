import { JwtGuard } from '@complements/guards/jwt.guard';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { EmpleadoEntity } from '@orm/entities/empleado.entity';
import { EmpleadoService } from '@services/empleado.service';

@Controller('empleado')
@UseGuards(JwtGuard)
export class EmpleadoController {
    constructor(
        private empleadoService: EmpleadoService
    ) { }

    @Get('disponibles')
    async empleadosDisponibles(
        @Query('userId') usuarioId: string,
        @Query('rol') rol: string,
        @Query('consulta') filtro: string
    ) {
        return await this.empleadoService.getDisponibles(parseInt(usuarioId), rol, filtro);
    }

    @Get('venta')
    async getEmpleadoByVenta(
        @Query('ventaId') ventaId: string
    ) {
        return await this.empleadoService.getByVentaId(parseInt(ventaId));
    }

    @Get('mostrar')
    async empleadosMostrar(
        @Query('userId') userId: string,
        @Query('rol') rol: string
    ) {
        return await this.empleadoService.getEmpleadosMostrar(parseInt(userId), rol);
    }

    @Post('crear')
    async crearEmpleado(@Body() nuevo: EmpleadoEntity) {
        return await this.empleadoService.crear(nuevo);
    }

    @Post('actualizar')
    async actualizarEmpleado(@Body() modificar: EmpleadoEntity) {
        return await this.empleadoService.modificar(modificar.id, modificar);
    }

    @Get('id')
    async getById(
        @Query('id') id: string
    ) {
        return await this.empleadoService.buscarPorId(parseInt(id));
    }
}
