import { ApiProperty } from "@nestjs/swagger";

/**
 * Estadísticas de porcentaje de ventas por método de pago
 * Basado en la consulta: porcentaje de ventas según el método de pago
 */
export class PaymentMethodStats {
    @ApiProperty({
        description: 'Total number of sales',
        example: 500
    })
    totalSales: number;

    @ApiProperty({
        description: 'Debit card sales percentage (0-100)',
        example: 25.5
    })
    debitSalesRatio: number;

    @ApiProperty({
        description: 'Platform sales percentage (0-100)',
        example: 15.0
    })
    platformsSalesRatio: number;

    @ApiProperty({
        description: 'Cash sales percentage (0-100)',
        example: 35.0
    })
    cashSalesRatio: number;

    @ApiProperty({
        description: 'Bank transfer sales percentage (0-100)',
        example: 12.5
    })
    transferenceSalesRatio: number;

    @ApiProperty({
        description: 'Credit card sales percentage (0-100)',
        example: 12.0
    })
    creditSalesRatio: number;
}
