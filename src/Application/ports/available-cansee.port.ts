import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { IdValue } from "@Domain/interfaces/id-value.interface";

export interface GetAvailableCanSeePort<T> {
    getAvailable(params: BasicSearchParams): Promise<Array<IdValue>>;
    getCanSee(params: BasicSearchParams): Promise<Array<T>>;
    getIdValueMany(values: Array<any>): Promise<Array<IdValue>>;
}