import { BasicSearchParams } from "./basic-search.params";

export class PermissionSearchParams extends BasicSearchParams {
    roleName: string;
    module: string;
    permission: string;
}