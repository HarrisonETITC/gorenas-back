import { z } from "zod";

export const RestaurantCreateSchema = z.object({
    name: z.string(({message: "El nombre del restaurante tiene que ser una cadena de texto"}))
        .min(4, "El nombre del restaurante debe tener al menos 4 caracteres"),
    address: z.string(({message: "La dirección del restaurante debe ser una cadena de texto"}))
        .min(4, "La dirección del restaurante debe tener al menos 4 caracteres")
})