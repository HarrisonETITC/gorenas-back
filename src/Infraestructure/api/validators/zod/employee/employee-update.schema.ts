import { StateModel } from "@Domain/models/general/state.model";
import { z } from "zod";
import { idField, relationStringField, stateField } from "../base/base.fields";

export const EmployeeUpdateSchema = z.object({
    id: idField,
    salary: z.number(({ message: "El salario tiene que ser un número" }))
        .positive("El salario tiene que ser un número positivo")
        .optional(),
    state: stateField(StateModel.BASIC_STATES, true),
    branch: relationStringField('sucursal', true),
    person: relationStringField('persona', true)
})