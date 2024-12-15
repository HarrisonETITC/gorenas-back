import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { Injectable } from "@nestjs/common";
import { BranchBuilder } from "@Domain/models/builders/branch.builder";
import { BranchModel } from "@Domain/models/branch.model";
import { BranchEntity } from "../entities/branch.entity";
import { BranchModelView } from "@Application/model-view/branch.mv";
import { BranchTransformParams } from "@Application/core/params/transform/branch-transform.params";

@Injectable()
export class BranchEntityMapper implements EntityMapperPort<BranchModel, BranchEntity, BranchModelView, BranchTransformParams> {
    fromEntityToDomain(entity: BranchEntity): BranchModel {
        return new BranchBuilder()
            .setId(entity.id ?? null)
            .setState(entity.state ?? null)
            .setName(entity.name ?? null)
            .setAddress(entity.address ?? null)
            .setEarnings(entity.earnings ?? null)
            .setCreated(entity.created ?? null)
            .setModified(entity.modified ?? null)
            .build();
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
