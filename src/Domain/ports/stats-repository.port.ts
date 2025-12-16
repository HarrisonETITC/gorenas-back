import { EmployeeSalesStats } from "@Domain/types/stats/employee-sales-stats.type";
import { BranchSalesStats } from "@Domain/types/stats/branch-sales-stats.type";
import { PaymentMethodStats } from "@Domain/types/stats/payment-method-stats.type";

/**
 * Port para el repositorio de estadísticas
 * Define las operaciones de consulta de métricas del sistema
 */
export interface StatsRepositoryPort {
    /**
     * Obtiene los empleados con mayor monto vendido
     * @param limit Cantidad máxima de resultados (default: 10)
     * @returns Lista de empleados ordenados por monto total vendido
     */
    getEmployeesWithMostAmountSold(limit?: number): Promise<EmployeeSalesStats[]>;

    /**
     * Obtiene los empleados con mayor cantidad de ventas realizadas
     * @param limit Cantidad máxima de resultados (default: 10)
     * @returns Lista de empleados ordenados por número de ventas
     */
    getEmployeesWithMostSales(limit?: number): Promise<EmployeeSalesStats[]>;

    /**
     * Obtiene las sucursales con mayor cantidad de ventas
     * @param limit Cantidad máxima de resultados (default: 10)
     * @returns Lista de sucursales ordenadas por monto/cantidad de ventas
     */
    getBranchesWithMostSales(limit?: number): Promise<BranchSalesStats[]>;

    /**
     * Obtiene el porcentaje de ventas por método de pago
     * @returns Lista con cada método de pago y su porcentaje del total
     */
    getPercentageOfSalesByPaymentMethod(): Promise<PaymentMethodStats[]>;
}
