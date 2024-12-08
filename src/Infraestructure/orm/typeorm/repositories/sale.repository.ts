import { Inject, Injectable } from "@nestjs/common";
import { GeneralRepository } from "./general.repository";
import { SaleModel } from "@Domain/models/sale.model";
import { SaleEntity } from "../entities/sale.entity";
import { SaleModelView } from "@Application/model-view/sale.mv";
import { DataSource } from "typeorm";
import { SALE_ENTITY_MAPPER } from "@Application/config/inject-tokens/sale.tokens";
import { EntityMapperPort } from "@Application/ports/entity-mapper.port";

@Injectable()
export class SaleRepository extends GeneralRepository<SaleModel, SaleEntity, SaleModelView> {
    constructor(
        @Inject(DataSource) protected source: DataSource,
        @Inject(SALE_ENTITY_MAPPER) protected mapper: EntityMapperPort<SaleModel, SaleEntity, SaleModelView>
    ) {
        super(source, SaleEntity, mapper);
    }
}
