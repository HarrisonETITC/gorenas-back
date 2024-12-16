import { AppUtil } from "@Application/core/utils/app.util";
import { ValidationUtil } from "@Application/core/utils/validation.util";
import { PersonModel } from "@Domain/models/person.model";
import { z } from "zod";
import { idField, relationStringField } from "../base/base.fields";

export const PersonUpdateSchema = z.object({
    id: idField,
    names: z.string(({ message: "El/Los nombre(s) tiene(n) que ser una cadena de texto" }))
        .optional(),
    surnames: z.string({ message: "El/Los apellido(s) tiene(n) que ser una cadena de texto" })
        .optional(),
    identification: z.string(({ message: "El número de identificación tiene que ser una cadena de texto" }))
        .refine(s => !AppUtil.verifyEmpty(Number(s)), "El número de identificación tiene que ser un texto númerico")
        .optional(),
    typeIdentification: z.string(({ message: "El tipo de identificación tiene que ser una cadena de texto" }))
        .refine(s => PersonModel.TYPES_IDENTIFICATION.includes(s), ValidationUtil.getStateErrorMessage("El tipo de identificación tiene que ser uno de los siguientes valores: ", PersonModel.TYPES_IDENTIFICATION))
        .optional(),
    phoneNumber: z.string(({ message: "El número de teléfono tiene que ser una cadena de texto" }))
        .refine(s => !AppUtil.verifyEmpty(Number(s)), "El número de teléfono tiene que ser una cadena numerica")
        .optional(),
    rh: z.string(({ message: "El tipo de rh tiene que ser una cadena de texto" }))
        .refine(rh => PersonModel.RH_TYPES.includes(rh), ValidationUtil.getStateErrorMessage("El tipo de rh tiene que ser uno de los siguientes valores: ", PersonModel.RH_TYPES))
        .optional(),
    address: z.string(({ message: "La dirección tiene que ser una cadena de texto" }))
        .optional(),
    born: z.date(({ message: "La fecha de nacimiento tiene que ser una fecha válida" }))
        .optional(),
    rol: relationStringField('rol', true),
    user: relationStringField('usuario', true)
})