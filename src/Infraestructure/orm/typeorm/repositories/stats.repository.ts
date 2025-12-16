import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { StatsRepositoryPort } from "@Domain/ports/stats-repository.port";
import { EmployeeSalesStats } from "@Domain/types/stats/employee-sales-stats.type";
import { BranchSalesStats } from "@Domain/types/stats/branch-sales-stats.type";
import { PaymentMethodStats } from "@Domain/types/stats/payment-method-stats.type";

@Injectable()
export class StatsRepository implements StatsRepositoryPort {
    
    constructor(
        private readonly dataSource: DataSource
    ) {}

    /**
     * Obtiene los empleados con mayor monto vendido
     * @param limit Cantidad máxima de resultados (default: 10)
     * @returns Lista de empleados ordenados por monto total vendido
     */
    async getEmployeesWithMostAmountSold(limit: number = 10): Promise<EmployeeSalesStats[]> {
        // TODO: Implementar query
        // SELECT e.id, p.names, p.surnames, b.name as branch_name,
        //        COUNT(s.id) as sales_count, SUM(s.amount) as total_amount,
        //        AVG(s.amount) as average_ticket
        // FROM employee e
        // JOIN person p ON p.id = e.personId
        // JOIN branch b ON b.id = e.branchId
        // JOIN sales s ON s.employeeId = e.id
        // GROUP BY e.id
        // ORDER BY total_amount DESC
        // LIMIT :limit
        return [];
    }

    /**
     * Obtiene los empleados con mayor cantidad de ventas realizadas
     * @param limit Cantidad máxima de resultados (default: 10)
     * @returns Lista de empleados ordenados por número de ventas
     */
    async getEmployeesWithMostSales(limit: number = 10): Promise<EmployeeSalesStats[]> {
        // TODO: Implementar query
        // SELECT e.id, p.names, p.surnames, b.name as branch_name,
        //        COUNT(s.id) as sales_count, SUM(s.amount) as total_amount,
        //        AVG(s.amount) as average_ticket
        // FROM employee e
        // JOIN person p ON p.id = e.personId
        // JOIN branch b ON b.id = e.branchId
        // JOIN sales s ON s.employeeId = e.id
        // GROUP BY e.id
        // ORDER BY sales_count DESC
        // LIMIT :limit
        return [];
    }

    /**
     * Obtiene las sucursales con mayor cantidad de ventas
     * @param limit Cantidad máxima de resultados (default: 10)
     * @returns Lista de sucursales ordenadas por monto/cantidad de ventas
     */
    async getBranchesWithMostSales(limit: number = 10): Promise<BranchSalesStats[]> {
        // TODO: Implementar query
        // SELECT b.id, b.name, b.address,
        //        COUNT(DISTINCT e.id) as employee_count,
        //        COUNT(s.id) as sales_count, SUM(s.amount) as total_amount,
        //        AVG(s.amount) as average_ticket
        // FROM branch b
        // JOIN employee e ON e.branchId = b.id
        // JOIN sales s ON s.employeeId = e.id
        // GROUP BY b.id
        // ORDER BY total_amount DESC
        // LIMIT :limit
        return [];
    }

    /**
     * Obtiene el porcentaje de ventas por método de pago
     * @returns Lista con cada método de pago y su porcentaje del total
     */
    async getPercentageOfSalesByPaymentMethod(): Promise<PaymentMethodStats[]> {
        // TODO: Implementar query
        // SELECT s.paymenthMethod,
        //        COUNT(s.id) as sales_count,
        //        SUM(s.amount) as total_amount,
        //        (SUM(s.amount) / (SELECT SUM(amount) FROM sales) * 100) as percentage
        // FROM sales s
        // GROUP BY s.paymenthMethod
        // ORDER BY total_amount DESC
        return [];
    }
}
