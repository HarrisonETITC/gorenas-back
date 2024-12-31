import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { SelectQueryBuilder } from "typeorm";
import { GeneralEntity } from "../entities/general/general.entity";

export interface ProcessFilterPort<T extends GeneralEntity> {
    processFilter(query: SelectQueryBuilder<T>, filter: BasicSearchParams): Promise<void>;
}