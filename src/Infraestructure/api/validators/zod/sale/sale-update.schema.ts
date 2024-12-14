import { ValidationUtil } from "@Application/core/utils/validation.util";
import { SaleModel } from "@Domain/models/sale.model";
import { z } from "zod";
import { createdField, idField, modifiedField, relationStringField } from "../base/base.fields";

export const SaleUpdateSchema = z.object({
    id: idField,
    amount: z.number(({ message: "El monto de la venta tiene que ser un número" }))
        .positive("El monto no puede ser negativo")
        .optional(),
    paymentMethod: z.string(({ message: "El método de pago tiene que ser una cadena" }))
        .refine(s => SaleModel.PAYMENT_METHODS.includes(s), ValidationUtil.getStateErrorMessage("El método de pago tiene que ser uno de los siguientes valores: ", SaleModel.PAYMENT_METHODS))
        .optional(),
    created: createdField(true),
    modified: modifiedField(true),
    employee: relationStringField('empleado', true)
})