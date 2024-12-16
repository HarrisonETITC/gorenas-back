import { StateModel } from "@Domain/models/general/state.model";
import { z } from "zod";
import { relationStringField, stateField } from "../base/base.fields";

export const EmployeeCreateSchema = z.object({
    salary: z.number(({ message: "El salario tiene que ser un número" }))
        .positive("El salario tiene que ser un número positivo"),
    state: stateField(StateModel.BASIC_STATES, true),
    branch: relationStringField('sucursal'),
    person: relationStringField('persona')
})