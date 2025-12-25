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
            .setPaymentMethod(entity.paymenthMethod ?? null)
            .setCreated(entity.created ?? null)
            .setModified(entity.modified ?? null)
            .setEmployeeId(entity.employeeId ?? null)
            .build();
    }
    fromDomainToEntity(domain: SaleModel, params: Map<string, string>): SaleEntity {
        const entity: Partial<SaleEntity> = {
            id: domain.id ?? null,
            amount: domain.amount ?? null,
            paymenthMethod: domain.paymenthMethod ?? null,
            employeeId: domain.employeeId ?? null
        };
        
        // Solo incluir fechas si tienen valor
        if (domain.created) entity.created = domain.created;
        if (domain.modified) entity.modified = domain.modified;
        
        return entity as SaleEntity;
    }
    fromDomainToMv(domain: SaleModel, extra?: SaleTransformParams): SaleModelView {
        return {
            id: domain.id ?? null,
            amount: +domain.amount,
            employee: extra?.employee ?? '',
            branch: extra?.branch ?? '',
            paymenthMethod: domain.paymenthMethod,
            created: domain.created
        };
    }
}
