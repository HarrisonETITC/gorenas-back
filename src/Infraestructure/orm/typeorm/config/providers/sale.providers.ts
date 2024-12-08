import { SALE_DTO_MAPPER, SALE_ENTITY_MAPPER, SALE_REPOSITORY, SALE_SERVICE } from "@Application/config/inject-tokens/sale.tokens";
import { Provider } from "@nestjs/common";
import { SaleEntityMapper } from "../../mappers/sale-entity.mapper";
import { SaleRepository } from "../../repositories/sale.repository";
import { SaleDtoMapper } from "@Application/mappers/sale-dto.mapper";
import { SaleServiceAdapter } from "@Application/adapters/sale-service.adapter";

export const SaleProviders: Array<Provider> = [
    {
        provide: SALE_ENTITY_MAPPER,
        useClass: SaleEntityMapper
    },
    {
        provide: SALE_REPOSITORY,
        useClass: SaleRepository
    },
    {
        provide: SALE_DTO_MAPPER,
        useClass: SaleDtoMapper
    },
    {
        provide: SALE_SERVICE,
        useClass: SaleServiceAdapter
    }
]
