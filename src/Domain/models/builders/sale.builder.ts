import { IBuilder } from "@Domain/interfaces/builder.interface";
import { SaleModel } from "../sale.model";

export class SaleBuilder implements IBuilder<SaleModel> {
    private sale: SaleModel;
    
    constructor() {
        this.reset();
    }

    setId(id: number) {
        this.sale.id = id;
        return this;
    }
    setAmmount(ammount: number) {
        this.sale.ammount = ammount;
        return this;
    }
    setPaymentMethod(paymentMethod: string) {
        this.sale.paymentMethod = paymentMethod;
        return this;
    }
    setCreated(created: Date) {
        this.sale.created = created;
        return this;
    }
    setModified(modified: Date) {
        this.sale.modified = modified;
        return this;
    }
    build(): SaleModel {
        const builded = this.sale;
        this.reset();
        return builded;
    }
    reset(): void {
        this.sale = new SaleModel();
    }
}