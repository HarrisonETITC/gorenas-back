import { GeneralModel } from "./general/general.model";
import { StateModel } from "./general/state.model";

export class RoleModel implements GeneralModel, StateModel {

    public static readonly ROLE_ADMINISTRATOR = 'administrador';
    public static readonly ROLE_PROPIETARY = 'propietario';
    public static readonly ROLE_MANAGER = 'gerente';
    public static readonly ROLE_CASHIER = 'cajero';
    public static readonly BASE_ROLES = new Array<string>();

    static {
        this.BASE_ROLES.push(this.ROLE_ADMINISTRATOR);
        this.BASE_ROLES.push(this.ROLE_PROPIETARY);
        this.BASE_ROLES.push(this.ROLE_MANAGER);
        this.BASE_ROLES.push(this.ROLE_CASHIER);
    }

    id: number;
    name: string;
    state: string;
    created: Date;
    modified: Date;
}