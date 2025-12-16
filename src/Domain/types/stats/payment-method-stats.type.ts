import { ApiProperty } from "@nestjs/swagger";

/**
 * Estadísticas de ventas por método de pago
 */
export class PaymentMethodStats {
    @ApiProperty({
        description: 'Método de pago',
        example: 'efectivo',
        enum: ['debito', 'credito', 'transferencia', 'plataformas', 'efectivo']
    })
    paymentMethod: string;

    @ApiProperty({
        description: 'Cantidad de ventas con este método',
        example: 120
    })
    salesCount: number;

    @ApiProperty({
        description: 'Monto total con este método de pago',
        example: 3500000.00
    })
    totalAmount: number;

    @ApiProperty({
        description: 'Porcentaje del total de ventas (0-100)',
        example: 35.5
    })
    percentage: number;
}
