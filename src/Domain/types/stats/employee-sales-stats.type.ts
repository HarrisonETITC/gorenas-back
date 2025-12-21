import { ApiProperty } from "@nestjs/swagger";

/**
 * Estadísticas de ventas por empleado
 * Basado en la consulta: empleados con mayor monto/cantidad de ventas
 */
export class EmployeeSalesStats {
    @ApiProperty({
        description: 'Employee ID',
        example: 1
    })
    employeeId: number;

    @ApiProperty({
        description: 'Employee full name (first name + last name)',
        example: 'Juan Pérez García'
    })
    fullName: string;

    @ApiProperty({
        description: 'Total number of sales',
        example: 150
    })
    salesCount: number;

    @ApiProperty({
        description: 'Total amount sold (truncated to integer)',
        example: 2500000
    })
    totalAmount: number;

    @ApiProperty({
        description: 'Average ticket per sale (truncated to integer)',
        example: 16666
    })
    averageTicket: number;
}
