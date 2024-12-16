import { StateModel } from "@Domain/models/general/state.model";
import { z } from "zod";
import { idField, relationStringField, stateField } from "../base/base.fields";

export const BranchUpdateSchema = z.object({
    id: idField,
    name: z.string(({ message: "El nombre tiene que ser una cadena" }))
        .min(4, "El nombre de la sucursal debe tener al menos 4 caracteres")
        .optional(),
    address: z.string(({ message: "La sucursal debe ser una cadena" }))
        .min(4, "La dirección de la sucursal debe tener al menos 4 carácteres")
        .optional(),
    earnings: z.number(({ message: "Las ganancias deben ser un número" }))
        .positive("Las ganancias no pueden ser negativas")
        .optional(),
    state: stateField(StateModel.BASIC_STATES, true),
    restaurant: relationStringField('restaurante', true)
})
