import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { DataResponse } from "@Domain/interfaces/data-response.interface";
import { IdValue } from "@Domain/interfaces/id-value.interface";

export interface ControllerAvailableCanSeePort<T> {
    getAvailable(params: BasicSearchParams): Promise<DataResponse<Array<IdValue>>>;
    getCanSee(params: BasicSearchParams): Promise<DataResponse<Array<T>>>;
}