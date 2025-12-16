import { ApiProperty } from "@nestjs/swagger";

/**
 * Estadísticas de ventas por empleado
 */
export class EmployeeSalesStats {
    @ApiProperty({
        description: 'ID del empleado',
        example: 1
    })
    employeeId: number;

    @ApiProperty({
        description: 'Nombre completo del empleado',
        example: 'Juan Pérez García'
    })
    employeeName: string;

    @ApiProperty({
        description: 'Nombre de la sucursal donde trabaja',
        example: 'Sucursal Centro'
    })
    branchName: string;

    @ApiProperty({
        description: 'Cantidad total de ventas realizadas',
        example: 150
    })
    salesCount: number;

    @ApiProperty({
        description: 'Monto total vendido',
        example: 2500000.50
    })
    totalAmount: number;

    @ApiProperty({
        description: 'Ticket promedio por venta',
        example: 16666.67
    })
    averageTicket: number;
}
