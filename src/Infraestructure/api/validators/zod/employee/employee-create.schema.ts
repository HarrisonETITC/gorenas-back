import { ValidationUtil } from "@Application/core/utils/validation.util";
import { StateModel } from "@Domain/models/general/state.model";
import { z } from "zod";

export const EmployeeCreateSchema = z.object({
    salary: z.number(({ message: "El salario tiene que ser un número" }))
        .positive("El salario tiene que ser un número positivo"),
    state: z.string(({ message: "El estado tiene que ser una cadena de texto" }))
        .refine(s => StateModel.BASIC_STATES.includes(s), ValidationUtil.getStateErrorMessage("El estado debe ser uno de los siguientes valores: ", StateModel.BASIC_STATES))
        .optional(),
    branch: z.string(({ message: "La sucursal del empleado tiene que ser una cadena de texto" })),
    person: z.string(({ message: "La persona asociada al empleado tiene que ser una cadena de texto" }))
})