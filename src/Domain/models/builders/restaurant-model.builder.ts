import { IBuilder } from "@Domain/interfaces/builder.interface";
import { RestaurantModel } from "../restaurant.model";

export class RestaurantBuilder implements IBuilder<RestaurantModel> {
    private restaurant: RestaurantModel;

    constructor() {
        this.reset();
    }

    setId(id: number) {
        this.restaurant.id = id;
        return this;
    }
    setName(name: string) {
        this.restaurant.name = name;
        return this;
    }
    setAddress(address: string) {
        this.restaurant.address = address;
        return this;
    }
    reset(): void {
        this.restaurant = new RestaurantModel();
    }
    build(): RestaurantModel {
        const builded = this.restaurant;
        this.reset();
        return builded;
    }
}