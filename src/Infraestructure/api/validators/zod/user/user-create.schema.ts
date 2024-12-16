import { z } from "zod";
import { createdField, stateField } from "../base/base.fields";
import { StateModel } from "@Domain/models/general/state.model";

export const UserCreateSchema = z.object({
    email: z.string(({ message: "La dirección de correo tiene que ser una cadena" }))
        .min(6, "La dirección de correo debe tener una longitud de al menos 6 carácteres"),
    password: z.string({ message: "La contraseña tiene que ser una cadena" })
        .min(8, "La contraseña debe tener al menos 8 caracteres"),
    state: stateField(StateModel.BASIC_STATES, true),
    created: createdField(true)
})