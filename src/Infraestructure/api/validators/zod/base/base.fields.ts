import { AppUtil } from "@Application/core/utils/app.util";
import { ValidationUtil } from "@Application/core/utils/validation.util";
import { z } from "zod";

export const idField = z.number(({ message: "El id tiene que ser un número" }))
    .positive("El id tiene que ser positivo");
export const stateField = (states: Array<string>, optional: boolean = false) => {
    const base = z.string(({ message: "El estado tiene que ser una cadena de texto" }))
        .refine(s => states.includes(s), ValidationUtil.getStateErrorMessage("El estado tiene que ser uno de los siguientes valores: ", states))

    if (optional)
        return base.optional()

    return base;
}

export const createdField = (optional: boolean = false) => {
    const base = dateField("La fecha de creación debe tener un formato válido");

    return (optional) ? base.optional() : base;
}

export const modifiedField = (optional: boolean = false) => {
    const base = dateField("La fecha de modificación debe tener un formato válido");

    return (optional) ? base.optional() : base;
}

const dateField = (message: string) => {
    return z.date(({ message }))
}

export const relationStringField = (name: string, optional: boolean = false) => {
    const base = z.string(({ message: `El ${name} tiene que ser una cadena de texto` }))
        .refine(s => !AppUtil.verifyEmpty(s), `El ${name} no puede estar vacío`);

    return (optional) ? base.optional() : base;
}
