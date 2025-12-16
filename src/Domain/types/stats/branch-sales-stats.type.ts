import { ApiProperty } from "@nestjs/swagger";

/**
 * Estadísticas de ventas por sucursal
 */
export class BranchSalesStats {
    @ApiProperty({
        description: 'ID de la sucursal',
        example: 1
    })
    branchId: number;

    @ApiProperty({
        description: 'Nombre de la sucursal',
        example: 'Sucursal Centro'
    })
    branchName: string;

    @ApiProperty({
        description: 'Dirección de la sucursal',
        example: 'Av. Principal #123-45'
    })
    branchAddress: string;

    @ApiProperty({
        description: 'Cantidad de empleados en la sucursal',
        example: 8
    })
    employeeCount: number;

    @ApiProperty({
        description: 'Cantidad total de ventas realizadas',
        example: 450
    })
    salesCount: number;

    @ApiProperty({
        description: 'Monto total de ventas',
        example: 8500000.00
    })
    totalAmount: number;

    @ApiProperty({
        description: 'Ticket promedio por venta',
        example: 18888.89
    })
    averageTicket: number;
}
