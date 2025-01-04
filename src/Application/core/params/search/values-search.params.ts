import { BasicSearchParams } from "./basic-search.params";

export class ValuesSearchParams<T = any> extends BasicSearchParams {
    values: Array<any>;
}