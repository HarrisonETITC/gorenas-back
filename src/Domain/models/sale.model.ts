import { CreatedModel } from "./general/created.model";
import { GeneralModel } from "./general/general.model";
import { ModifiedModel } from "./general/modified.model";

export class SaleModel implements GeneralModel, CreatedModel, ModifiedModel {
    public static readonly PAYMENT_METHOD_DEBIT = 'debito';
    public static readonly PAYMENT_METHOD_CREDIT = 'credito';
    public static readonly PAYMENT_METHOD_TRANSFERENCE = 'transferencia';
    public static readonly PAYMENT_METHOD_PLATFORMS = 'plataformas';
    public static readonly PAYMENT_METHOD_CASH = 'efectivo';
    public static readonly PAYMENT_METHODS = new Array<string>();

    static {
        this.PAYMENT_METHODS.push(this.PAYMENT_METHOD_DEBIT);
        this.PAYMENT_METHODS.push(this.PAYMENT_METHOD_CREDIT);
        this.PAYMENT_METHODS.push(this.PAYMENT_METHOD_TRANSFERENCE);
        this.PAYMENT_METHODS.push(this.PAYMENT_METHOD_PLATFORMS);
        this.PAYMENT_METHODS.push(this.PAYMENT_METHOD_CASH);
    }

    id: number;
    amount: number;
    paymentMethod: string;
    created: Date;
    modified: Date;
}