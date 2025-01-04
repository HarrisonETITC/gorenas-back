import { BranchModel } from "@Domain/models/branch.model";
import { GeneralRepository } from "./general.repository";
import { BranchEntity } from "../entities/branch.entity";
import { BranchModelView } from "@Application/model-view/branch.mv";
import { DataSource, In, SelectQueryBuilder } from "typeorm";
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
import { BranchSearchParams } from "@Application/core/params/search/branch-search.params";
import { ProcessFilterPort } from "../ports/process-filter.port";

@Injectable()
export class BranchRepository extends GeneralRepository<BranchModel, BranchEntity, BranchModelView, BranchTransformParams>
    implements GetAvailableCanSeePort<BranchModelView>, ProcessFilterPort<BranchEntity> {
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
    async getCanSee(params: BranchSearchParams): Promise<BranchModelView[]> {
        const data = await BranchCanSeeContext(params.role).getData(params, this);
        const restaurant = await this.source.getRepository(RestaurantEntity).findOneBy({ id: data[0]?.restaurantId ?? 0 });

        return data.map(d => this.mapper.fromDomainToMv(d, {
            restaurantName: restaurant?.name ?? ''
        }));
    }
    async getIdValueMany(ids: Array<IdValue>, query?: SelectQueryBuilder<BranchEntity>): Promise<Array<IdValue>> {
        if (AppUtil.verifyEmpty(ids))
            return [];

        let data = [];

        if (AppUtil.verifyEmpty(query)) {
            data = await this.manager.find({
                where: { id: In(AppUtil.extractIds(ids)) },
                select: { id: true, name: true, address: true }
            });
        } else {
            data = await query.select('id').addSelect('name').addSelect('address').getMany();
        }

        return AppUtil.transformToIdValue(data, 'id', ['name', 'address'], '-');
    }
    async processFilter(query: SelectQueryBuilder<BranchEntity>, filter: BranchSearchParams): Promise<void> {
        if (!AppUtil.verifyEmptySimple(filter.address))
            query.andWhere('s.address LIKE :address', { address: `%${filter.address}%` });
        if (!AppUtil.verifyEmptySimple(filter.name))
            query.andWhere('s.name LIKE :name', { name: `%${filter.name}%` });
        if (!AppUtil.verifyEmpty(filter.earningsLessThan))
            query.andWhere('s.earnings < :less', { less: filter.earningsLessThan });
        if (!AppUtil.verifyEmpty(filter.earningsGreatherThan))
            query.andWhere('s.earnings > :greather', { greather: filter.earningsGreatherThan });

        query.addOrderBy('s.earnings', "DESC");
    }
}
