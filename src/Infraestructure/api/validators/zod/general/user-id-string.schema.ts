import { AppUtil } from '@Application/core/utils/app.util';
import { z } from 'zod';

export const UserIdStringSchema = z.object({
    userId: z.string(({ message: "El id del usuario es requerido" })).refine(s => (!AppUtil.verifyEmpty(Number(s))), "El id del usuario tiene que ser un número")
})