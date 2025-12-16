import { Controller, Get, Inject, Query, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger";
import { STATS_SERVICE } from "@Application/config/inject-tokens/stats.tokens";
import { StatsServicePort } from "@Application/ports/stats/stats-service.port";
import { EmployeeSalesStats } from "@Domain/types/stats/employee-sales-stats.type";
import { BranchSalesStats } from "@Domain/types/stats/branch-sales-stats.type";
import { PaymentMethodStats } from "@Domain/types/stats/payment-method-stats.type";
import { ROUTE_STATS } from "@Application/api/api.routes";
import { DataResponse } from "@Domain/interfaces/data-response.interface";
import { JwtGuard } from "@Application/api/guards/jwt.guard";
import { RolesGuard } from "@Application/api/guards/rol.guard";

@ApiTags('Stats')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtGuard, RolesGuard)
@Controller(ROUTE_STATS)
export class StatsController {

    constructor(
        @Inject(STATS_SERVICE)
        private readonly statsService: StatsServicePort
    ) {}

    @Get('employees-with-most-amount-sold')
    @ApiOperation({ 
        summary: 'Get employees with most amount sold',
        description: 'Returns a list of employees ordered by their total sales amount'
    })
    @ApiQuery({ 
        name: 'limit', 
        required: false, 
        type: Number, 
        description: 'Maximum number of results (default: 10)',
        example: 10
    })
    @ApiResponse({ 
        status: 200, 
        description: 'List of employees with their sales statistics',
        type: [EmployeeSalesStats]
    })
    async getEmployeesWithMostAmountSold(
        @Query('limit') limit?: number
    ): Promise<DataResponse<EmployeeSalesStats[]>> {
        return { data: await this.statsService.getEmployeesWithMostAmountSold(limit ?? 10) };
    }

    @Get('employees-with-most-sales')
    @ApiOperation({ 
        summary: 'Get employees with most sales count',
        description: 'Returns a list of employees ordered by their number of sales'
    })
    @ApiQuery({ 
        name: 'limit', 
        required: false, 
        type: Number, 
        description: 'Maximum number of results (default: 10)',
        example: 10
    })
    @ApiResponse({ 
        status: 200, 
        description: 'List of employees with their sales count statistics',
        type: [EmployeeSalesStats]
    })
    async getEmployeesWithMostSales(
        @Query('limit') limit?: number
    ): Promise<DataResponse<EmployeeSalesStats[]>> {
        return { data: await this.statsService.getEmployeesWithMostSales(limit ?? 10) };
    }

    @Get('branches-with-most-sales')
    @ApiOperation({ 
        summary: 'Get branches with most sales',
        description: 'Returns a list of branches ordered by their total sales amount'
    })
    @ApiQuery({ 
        name: 'limit', 
        required: false, 
        type: Number, 
        description: 'Maximum number of results (default: 10)',
        example: 10
    })
    @ApiResponse({ 
        status: 200, 
        description: 'List of branches with their sales statistics',
        type: [BranchSalesStats]
    })
    async getBranchesWithMostSales(
        @Query('limit') limit?: number
    ): Promise<DataResponse<BranchSalesStats[]>> {
        return { data: await this.statsService.getBranchesWithMostSales(limit ?? 10) };
    }

    @Get('percentage-of-sales-by-payment-method')
    @ApiOperation({ 
        summary: 'Get sales percentage by payment method',
        description: 'Returns the distribution of sales by payment method with percentages'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'List of payment methods with their sales percentages',
        type: [PaymentMethodStats]
    })
    async getPercentageOfSalesByPaymentMethod(): Promise<DataResponse<PaymentMethodStats[]>> {
        return { data: await this.statsService.getPercentageOfSalesByPaymentMethod() };
    }
}
