import { StateModel } from "@Domain/models/general/state.model";
import { z } from "zod";
import { idField, stateField } from "../base/base.fields";

export const RoleUpdateSchema = z.object({
    id: idField,
    name: z.string(({ message: "El nombre del rol tiene que ser una cadena de texto" }))
        .min(5, "El nombre del rol no puede ser menor a 5 caracteres")
        .optional(),
    state: stateField(StateModel.BASIC_STATES, true)
})