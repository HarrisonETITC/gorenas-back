import { GeneralRepositoryPort } from "@Domain/ports/general-repository.port";
import { BasicSearchParams } from "../params/search/basic-search.params";
import { GeneralModel } from "@Domain/models/general/general.model";

export interface GetDataStrategy<T extends GeneralModel> {
    getData<U extends BasicSearchParams>(args: U, repository: GeneralRepositoryPort<T>): Promise<Array<T>>;
}