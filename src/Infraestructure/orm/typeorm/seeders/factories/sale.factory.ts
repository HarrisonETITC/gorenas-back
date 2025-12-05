import { setSeederFactory } from "typeorm-extension";
import { SaleEntity } from "../../entities/sale.entity";
import { SaleModel } from "@Domain/models/sale.model";

export const SaleFactory = setSeederFactory(SaleEntity, (faker) => {
    const sale = new SaleEntity();
    sale.amount = faker.number.int({ min: 10000, max: 100000 });
    sale.paymenthMethod = faker.helpers.arrayElement(SaleModel.PAYMENT_METHODS);

    return sale;
})