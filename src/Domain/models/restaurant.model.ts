import { GeneralModel } from "./general/general.model";

export class RestaurantModel implements GeneralModel {
    id: number;
    name: string;
    address: string;
}