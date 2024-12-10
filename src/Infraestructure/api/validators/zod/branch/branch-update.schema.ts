import { ValidationUtil } from "@Application/core/utils/validation.util";
import { StateModel } from "@Domain/models/general/state.model";
import { z } from "zod";

export const BranchUpdateSchema = z.object({
    id: z.number(({ message: "El id tiene que ser un número" }))
        .min(1, "El id no puede ser menor a 1"),
    name: z.string(({ message: "El nombre tiene que ser una cadena" }))
        .min(4, "El nombre de la sucursal debe tener al menos 4 caracteres")
        .optional(),
    address: z.string(({ message: "La sucursal debe ser una cadena" }))
        .min(4, "La dirección de la sucursal debe tener al menos 4 carácteres")
        .optional(),
    earnings: z.number(({ message: "Las ganancias deben ser un número" }))
        .positive("Las ganancias no pueden ser negativas")
        .optional(),
    state: z.string(({ message: "El estado tiene que ser una cadena" }))
        .refine(s => StateModel.BASIC_STATES.includes(s), ValidationUtil.getStateErrorMessage("El estado tiene que ser uno de los siguientes valores: ", StateModel.BASIC_STATES))
        .optional(),
    restaurant: z.string(({ message: "El restaurante tiene que ser una cadena" }))
        .optional()
})
