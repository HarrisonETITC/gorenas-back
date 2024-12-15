import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { IdValue } from "@Domain/interfaces/id-value.interface";

export interface GetAvailableCanSeePort<T> {
    getAvailable<U extends BasicSearchParams>(params: U): Promise<Array<IdValue>>;
    getCanSee<U extends BasicSearchParams>(params: U): Promise<Array<T>>;
}