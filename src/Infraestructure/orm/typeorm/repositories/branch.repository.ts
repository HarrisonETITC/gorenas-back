import { BranchModel } from "@Domain/models/branch.model";
import { GeneralRepository } from "./general.repository";
import { BranchEntity } from "../entities/branch.entity";
import { BranchModelView } from "@Application/model-view/branch.mv";
import { DataSource } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { BRANCH_ENTITY_MAPPER } from "@Application/config/inject-tokens/branch.tokens";
import { BranchTransformParams } from "@Application/core/params/transform/branch-transform.params";
import { GetAvailableCanSeePort } from "@Application/ports/available-cansee.port";
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { IdValue } from "@Domain/interfaces/id-value.interface";
import { BranchCanSeeContext } from "../strategy-context/branch.context";
import { AppUtil } from "@Application/core/utils/app.util";
import { RestaurantEntity } from "../entities/restaurant.entity";

@Injectable()
export class BranchRepository extends GeneralRepository<BranchModel, BranchEntity, BranchModelView, BranchTransformParams> implements GetAvailableCanSeePort<BranchModelView> {
    constructor(
        @Inject(DataSource)
        readonly source: DataSource,
        @Inject(BRANCH_ENTITY_MAPPER)
        mapper: EntityMapperPort<BranchModel, BranchEntity, BranchModelView, BranchTransformParams>
    ) {
        super(source, BranchEntity, mapper);
    }

    async getAvailable(params: BasicSearchParams): Promise<Array<IdValue>> {
        const data = await this.manager.createQueryBuilder("b")
            .where("(b.name LIKE :search OR b.address LIKE :search)", { search: `%${params.query ?? ''}%` })
            .getMany();

        return AppUtil.transformToIdValue(data, 'id', ['name', 'address'], '-');
    }
    async getCanSee(params: BasicSearchParams): Promise<BranchModelView[]> {
        const data = await BranchCanSeeContext(params.role).getData(params, this);
        const restaurant = await this.source.getRepository(RestaurantEntity).findOneBy({ id: data[0]?.restaurantId ?? 0 });

        return data.map(d => this.mapper.fromDomainToMv(d, {
            restaurantName: restaurant?.name ?? ''
        }));
    }
}
