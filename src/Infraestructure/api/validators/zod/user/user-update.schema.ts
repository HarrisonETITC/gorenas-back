import { z } from "zod";
import { createdField, idField, stateField } from "../base/base.fields";
import { StateModel } from "@Domain/models/general/state.model";

export const UserUpdateSchema = z.object({
    id: idField,
    email: z.string(({ message: "La dirección de correo tiene que ser una cadena" }))
        .min(6, "La dirección de correo debe tener una longitud de al menos 6 carácteres")
        .optional(),
    password: z.string({ message: "La contraseña tiene que ser una cadena" })
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .optional(),
    state: stateField(StateModel.BASIC_STATES, true),
    created: createdField(true)
})