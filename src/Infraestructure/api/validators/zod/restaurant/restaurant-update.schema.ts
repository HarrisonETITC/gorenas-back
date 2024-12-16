import { z } from "zod";
import { idField } from "../base/base.fields";

export const RestaurantUpdateSchema = z.object({
    id: idField,
    name: z.string(({ message: "El nombre del restaurante tiene que ser una cadena de texto" }))
        .min(4, "El nombre del restaurante debe tener al menos 4 caracteres")
        .optional(),
    address: z.string(({ message: "La dirección del restaurante debe ser una cadena de texto" }))
        .min(4, "La dirección del restaurante debe tener al menos 4 caracteres")
        .optional()
})