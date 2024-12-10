import { AppUtil } from '@Application/core/utils/app.util';
import { z } from 'zod';

export const IdStringSchema = z.object({
    id: z.string(({ message: "El id es requerido" })).refine(s => !AppUtil.verifyEmpty(parseInt(s)), "El id tiene que ser un número")
})