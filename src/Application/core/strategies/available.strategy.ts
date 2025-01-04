import { GeneralRepositoryPort } from "@Domain/ports/general-repository.port";
import { BasicSearchParams } from "../params/search/basic-search.params";
import { GeneralModel } from "@Domain/models/general/general.model";

export interface GetDataStrategy<T extends GeneralModel, K = T> {
    getData(args: BasicSearchParams, repository: GeneralRepositoryPort<T, K>): Promise<Array<T>>;
}