import { ApiProperty } from "@nestjs/swagger";

/**
 * Estadísticas de ventas por sucursal
 * Basado en la consulta: sucursales que más venden
 */
export class BranchSalesStats {
    @ApiProperty({
        description: 'Branch ID',
        example: 1
    })
    branchId: number;

    @ApiProperty({
        description: 'Branch name',
        example: 'Sucursal Centro'
    })
    branchName: string;

    @ApiProperty({
        description: 'Branch address',
        example: 'Av. Principal #123-45'
    })
    branchAddress: string;

    @ApiProperty({
        description: 'Total sales amount for the branch',
        example: 8500000.00
    })
    totalAmount: number;
}
