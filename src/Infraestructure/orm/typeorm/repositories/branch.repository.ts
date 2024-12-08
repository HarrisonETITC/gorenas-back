import { BranchModel } from "@Domain/models/branch.model";
import { GeneralRepository } from "./general.repository";
import { BranchEntity } from "../entities/branch.entity";
import { BranchModelView } from "@Application/model-view/branch.mv";
import { DataSource } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { BRANCH_ENTITY_MAPPER } from "@Application/config/inject-tokens/branch.tokens";

@Injectable()
export class BranchRepository extends GeneralRepository<BranchModel, BranchEntity, BranchModelView> {
    constructor(
        @Inject(DataSource) protected source: DataSource,
        @Inject(BRANCH_ENTITY_MAPPER) protected mapper: EntityMapperPort<BranchModel, BranchEntity, BranchModelView>
    ) {
        super(source, BranchEntity, mapper);
    }
}
