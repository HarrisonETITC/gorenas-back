import { BasicSearchParams } from "./basic-search.params";

export class BranchSearchParams extends BasicSearchParams {
    name: string;
    address: string;
    earningsLessThan: number;
    earningsGreatherThan: number;
}