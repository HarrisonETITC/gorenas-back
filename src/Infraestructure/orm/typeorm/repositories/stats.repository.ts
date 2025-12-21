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
        return this.dataSource
            .createQueryBuilder()
            .select('e.id', 'employeeId')
            .addSelect("CONCAT(p.names, ' ', p.surnames)", 'fullName')
            .addSelect('COUNT(s.id)', 'salesCount')
            .addSelect('TRUNCATE(SUM(s.amount), 0)', 'totalAmount')
            .addSelect('TRUNCATE(AVG(s.amount), 0)', 'averageTicket')
            .from('employee', 'e')
            .innerJoin('person', 'p', 'p.id = e.person_id')
            .innerJoin('sale', 's', 's.employee_id = e.id')
            .where('MONTH(s.created) = MONTH(NOW())')
            .andWhere("e.state = 'A'")
            .groupBy('e.id')
            .orderBy('totalAmount', 'DESC')
            .limit(limit)
            .getRawMany();
    }

    /**
     * Obtiene los empleados con mayor cantidad de ventas realizadas
     * @param limit Cantidad máxima de resultados (default: 10)
     * @returns Lista de empleados ordenados por número de ventas
     */
    async getEmployeesWithMostSales(limit: number = 10): Promise<EmployeeSalesStats[]> {
        return this.dataSource
            .createQueryBuilder()
            .select('e.id', 'employeeId')
            .addSelect("CONCAT(p.names, ' ', p.surnames)", 'fullName')
            .addSelect('COUNT(s.id)', 'salesCount')
            .addSelect('TRUNCATE(SUM(s.amount), 0)', 'totalAmount')
            .addSelect('TRUNCATE(AVG(s.amount), 0)', 'averageTicket')
            .from('employee', 'e')
            .innerJoin('person', 'p', 'p.id = e.person_id')
            .innerJoin('sale', 's', 's.employee_id = e.id')
            .where('MONTH(s.created) = MONTH(NOW())')
            .andWhere("e.state = 'A'")
            .groupBy('e.id')
            .orderBy('salesCount', 'DESC')
            .limit(limit)
            .getRawMany();
    }

    /**
     * Obtiene las sucursales con mayor cantidad de ventas
     * @param limit Cantidad máxima de resultados (default: 10)
     * @returns Lista de sucursales ordenadas por monto de ventas
     */
    async getBranchesWithMostSales(limit: number = 10): Promise<BranchSalesStats[]> {
        return this.dataSource
            .createQueryBuilder()
            .select('b.id', 'branchId')
            .addSelect('b.name', 'branchName')
            .addSelect('b.address', 'branchAddress')
            .addSelect('SUM(s.amount)', 'totalAmount')
            .from('branch', 'b')
            .innerJoin('employee', 'e', 'b.id = e.branch_id')
            .innerJoin('sale', 's', 's.employee_id = e.id')
            .groupBy('b.id')
            .orderBy('totalAmount', 'DESC')
            .limit(limit)
            .getRawMany();
    }

    /**
     * Obtiene el porcentaje de ventas por método de pago
     * @returns Estadísticas con porcentajes de cada método de pago
     */
    async getPercentageOfSalesByPaymentMethod(): Promise<PaymentMethodStats[]> {
        return this.dataSource
            .createQueryBuilder()
            .select('COUNT(s.id)', 'totalSales')
            .addSelect("COUNT(CASE WHEN s.paymenth_method = 'debito' THEN 1 END) / COUNT(s.id) * 100", 'debitSalesRatio')
            .addSelect("COUNT(CASE WHEN s.paymenth_method = 'plataformas' THEN 1 END) / COUNT(s.id) * 100", 'platformsSalesRatio')
            .addSelect("COUNT(CASE WHEN s.paymenth_method = 'efectivo' THEN 1 END) / COUNT(s.id) * 100", 'cashSalesRatio')
            .addSelect("COUNT(CASE WHEN s.paymenth_method = 'transferencia' THEN 1 END) / COUNT(s.id) * 100", 'transferenceSalesRatio')
            .addSelect("COUNT(CASE WHEN s.paymenth_method = 'credito' THEN 1 END) / COUNT(s.id) * 100", 'creditSalesRatio')
            .from('sale', 's')
            .getRawMany();
    }
}
