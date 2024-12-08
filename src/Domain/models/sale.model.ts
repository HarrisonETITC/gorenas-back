import { CreatedModel } from "./general/created.model";
import { GeneralModel } from "./general/general.model";
import { ModifiedModel } from "./general/modified.model";

export class SaleModel implements GeneralModel, CreatedModel, ModifiedModel {
    id: number;
    ammount: number;
    paymentMethod: string;
    created: Date;
    modified: Date;
}