import { GeneralModel } from "@Domain/models/general/general.model";

export class PermissionModelView extends GeneralModel {
    public static readonly MODULE_DASHBOARD = "dashboard";
    public static readonly MODULE_BRANCHES = "branches";
    public static readonly MODULE_EMPLOYEES = "employees";
    public static readonly MODULE_SALES = "sales";
    public static readonly MODULE_USERS = "users";
    public static readonly MODULE_PERSONS = "persons";
    public static readonly MODULE_ROLES = "roles";
    public static readonly MODULE_PERMISSIONS = "permissions";
    public static readonly MODULES = new Array<string>();

    public static readonly ACTION_VIEW = "view";
    public static readonly ACTION_CREATE = "create";
    public static readonly ACTION_EDIT = "edit";
    public static readonly ACTION_DEACTIVATE = "deactivate";

    public static readonly ACTIONS = new Array<string>();

    public static readonly ALL_PERMISSIONS = "all_permissions";

    static {
        this.MODULES.push(this.MODULE_DASHBOARD);
        this.MODULES.push(this.MODULE_BRANCHES);
        this.MODULES.push(this.MODULE_EMPLOYEES);
        this.MODULES.push(this.MODULE_SALES);
        this.MODULES.push(this.MODULE_USERS);
        this.MODULES.push(this.MODULE_PERSONS);
        this.MODULES.push(this.MODULE_ROLES);
        this.MODULES.push(this.MODULE_PERMISSIONS);
        this.ACTIONS.push(this.ACTION_VIEW);
        this.ACTIONS.push(this.ACTION_CREATE);
        this.ACTIONS.push(this.ACTION_EDIT);
        this.ACTIONS.push(this.ACTION_DEACTIVATE);
    }

    name: string;
    role: string;
}