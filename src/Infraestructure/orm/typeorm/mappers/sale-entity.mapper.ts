import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { SaleModel } from "@Domain/models/sale.model";
import { Injectable } from "@nestjs/common";
import { SaleEntity } from "../entities/sale.entity";
import { SaleModelView } from "@Application/model-view/sale.mv";
import { SaleBuilder } from "@Domain/models/builders/sale.builder";
import { SaleTransformParams } from "@Application/core/params/transform/sale-transform.params";

@Injectable()
export class SaleEntityMapper implements EntityMapperPort<SaleModel, SaleEntity, SaleModelView, SaleTransformParams> {
    fromEntityToDomain(entity: SaleEntity): SaleModel {
        return new SaleBuilder()
            .setId(entity.id ?? null)
            .setAmount(entity.amount ?? null)
            .setPaymentMethod(entity.paymentMethod ?? null)
            .setCreated(entity.created ?? null)
            .setModified(entity.modified ?? null)
            .build();
    }
    fromDomainToEntity(domain: SaleModel): SaleEntity {
        return {
            id: domain.id ?? null,
            amount: domain.amount ?? null,
            paymentMethod: domain.paymentMethod ?? null,
            created: domain.created ?? null,
            modified: domain.modified ?? null
        };
    }
    fromDomainToMv(domain: SaleModel, extra?: SaleTransformParams): SaleModelView {
        return {
            id: domain.id ?? null,
            amount: domain.amount,
            employee: extra?.employee ?? '',
            branch: extra?.branch ?? '',
            method: domain.paymentMethod,
            created: domain.created
        };
    }
}
