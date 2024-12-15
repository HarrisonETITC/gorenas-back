import { AppUtil } from "@Application/core/utils/app.util";
import { z } from "zod";

export const BasicSearchSchema = z.object({
    id: z.string(({ message: "El el parámetro 'id' tiene que ser una cadena de texto" }))
        .refine(id => !AppUtil.verifyEmpty(id), "El parámetro 'id' no puede estar vacío"),
    role: z.string(({ message: "El parámetro 'role' tiene que ser una cadena de texto" }))
        .refine(role => !AppUtil.verifyEmpty(role), "El parámetro 'role' no puede estar vacío"),
    query: z.string(({ message: "El parámetro 'query' tiene que ser una cadena de texto" }))
        .refine(query => !AppUtil.verifyEmpty(query), "El parámetro 'query' no puede estar vacío")
        .optional()
})