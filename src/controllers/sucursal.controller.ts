import { JwtGuard } from '@complements/guards/jwt.guard';
import { RolesGuard } from '@complements/guards/rol.guard';
import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { SucursalEntity } from '@orm/entities/sucursal.entity';
import { SucursalService } from '@services/sucursal.service';
import { SucursalMv } from 'src/core/models/sucursal.modelview';

@Controller('sucursal')
@UseGuards(JwtGuard)
@UseGuards(RolesGuard)
export class SucursalController {
    constructor(
        private readonly sucursalService: SucursalService
    ) { }

    @Post('crear')
    async crearSucursal(@Body() nueva: SucursalEntity) {
        return await this.sucursalService.crear(nueva);
    }

    @Get('todos-restringido')
    async todosConParametros(
        @Query('userId') userId: string,
        @Query('rol') rol: string
    ): Promise<Array<SucursalMv>> {
        return (await this.sucursalService.sucursalesPersona(parseInt(userId), rol)).map(
            suc => new SucursalMv(suc.id, suc.direccion, suc.estado, suc.mes, suc.creado)
        );
    }

    @Get('restaurante-sucursal')
    async restauratePorSucursal(
        @Query('sucursalId') id: string
    ) {
        return await this.sucursalService.restaurantePorSucursalId(parseInt(id));
    }

    @Get('id')
    async getById(
        @Query('sucursalId') id: string
    ) {
        return await this.sucursalService.buscarPorId(parseInt(id));
    }

    @Put('actualizar')
    async actualizarSucursal(@Body() editar: SucursalEntity) {
        return await this.sucursalService.modificar(editar.id, editar);
    }

    @Get('disponibles')
    async getDisponibles(
        @Query('query') filtro: string
    ) {
        return await this.sucursalService.buscarDisponibles(filtro);
    }

    @Get('empleado-id')
    async buscarPorempleadoId(
        @Query('id') id: string
    ) {
        return await this.sucursalService.getByEmpleadoId(parseInt(id));
    }

    @Get('scripts')
    async getScripts() {
        return { script: await this.sucursalService.generateScript('sucursal') };
    }
}
