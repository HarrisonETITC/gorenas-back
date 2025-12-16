import { Inject, Injectable } from "@nestjs/common";
import { StatsServicePort } from "@Application/ports/stats/stats-service.port";
import { StatsRepositoryPort } from "@Domain/ports/stats-repository.port";
import { STATS_REPOSITORY } from "@Application/config/inject-tokens/stats.tokens";
import { EmployeeSalesStats } from "@Domain/types/stats/employee-sales-stats.type";
import { BranchSalesStats } from "@Domain/types/stats/branch-sales-stats.type";
import { PaymentMethodStats } from "@Domain/types/stats/payment-method-stats.type";

@Injectable()
export class StatsServiceAdapter implements StatsServicePort {
    
    constructor(
        @Inject(STATS_REPOSITORY)
        private readonly statsRepository: StatsRepositoryPort
    ) {}

    /**
     * Obtiene los empleados con mayor monto vendido
     * @param limit Cantidad máxima de resultados
     */
    async getEmployeesWithMostAmountSold(limit: number = 10): Promise<EmployeeSalesStats[]> {
        return this.statsRepository.getEmployeesWithMostAmountSold(limit);
    }

    /**
     * Obtiene los empleados con mayor cantidad de ventas realizadas
     * @param limit Cantidad máxima de resultados
     */
    async getEmployeesWithMostSales(limit: number = 10): Promise<EmployeeSalesStats[]> {
        return this.statsRepository.getEmployeesWithMostSales(limit);
    }

    /**
     * Obtiene las sucursales con mayor cantidad de ventas
     * @param limit Cantidad máxima de resultados
     */
    async getBranchesWithMostSales(limit: number = 10): Promise<BranchSalesStats[]> {
        return this.statsRepository.getBranchesWithMostSales(limit);
    }

    /**
     * Obtiene el porcentaje de ventas por método de pago
     */
    async getPercentageOfSalesByPaymentMethod(): Promise<PaymentMethodStats[]> {
        return this.statsRepository.getPercentageOfSalesByPaymentMethod();
    }
}
