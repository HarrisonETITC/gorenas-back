import { EmployeeSalesStats } from "@Domain/types/stats/employee-sales-stats.type";
import { BranchSalesStats } from "@Domain/types/stats/branch-sales-stats.type";
import { PaymentMethodStats } from "@Domain/types/stats/payment-method-stats.type";

/**
 * Port para el servicio de estadísticas
 * Define las operaciones de negocio para métricas del sistema
 */
export interface StatsServicePort {
    /**
     * Obtiene los empleados con mayor monto vendido
     * @param limit Cantidad máxima de resultados
     */
    getEmployeesWithMostAmountSold(limit?: number): Promise<EmployeeSalesStats[]>;

    /**
     * Obtiene los empleados con mayor cantidad de ventas realizadas
     * @param limit Cantidad máxima de resultados
     */
    getEmployeesWithMostSales(limit?: number): Promise<EmployeeSalesStats[]>;

    /**
     * Obtiene las sucursales con mayor cantidad de ventas
     * @param limit Cantidad máxima de resultados
     */
    getBranchesWithMostSales(limit?: number): Promise<BranchSalesStats[]>;

    /**
     * Obtiene el porcentaje de ventas por método de pago
     */
    getPercentageOfSalesByPaymentMethod(): Promise<PaymentMethodStats[]>;
}
