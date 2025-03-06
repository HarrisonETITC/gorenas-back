import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { Injectable } from "@nestjs/common";
import { BranchModel } from "@Domain/models/branch.model";
import { BranchEntity } from "../entities/branch.entity";
import { BranchModelView } from "@Application/model-view/branch.mv";
import { BranchTransformParams } from "@Application/core/params/transform/branch-transform.params";

@Injectable()
export class BranchEntityMapper implements EntityMapperPort<BranchModel, BranchEntity, BranchModelView, BranchTransformParams> {
    fromEntityToDomain(entity: BranchEntity): BranchModel {
        return {
            id: entity.id ?? null,
            state: entity.state ?? null,
            name: entity.name ?? null,
            address: entity.address ?? null,
            earnings: entity.earnings ?? null,
            created: entity.created ?? null,
            modified: entity.modified ?? null
        }
    }
    fromDomainToEntity(domain: BranchModel): BranchEntity {
        const entity = new BranchEntity();
        entity.id = domain.id ?? null;
        entity.state = domain.state ?? null;
        entity.name = domain.name ?? null;
        entity.address = domain.address ?? null;
        entity.earnings = domain.earnings ?? null;
        entity.created = domain.created ?? null;
        entity.modified = domain.modified ?? null;

        return entity
    }
    fromDomainToMv(domain: BranchModel, extra?: BranchTransformParams): BranchModelView {
        return {
            id: domain.id ?? null,
            name: domain.name ?? null,
            address: domain.address ?? null,
            state: domain.state ?? null,
            earnings: domain.earnings ?? null,
            created: domain.created ?? null,
            restaurantName: extra?.restaurantName ?? null
        };
    }
}
