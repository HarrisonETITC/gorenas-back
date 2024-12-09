import { StateModel } from '@Domain/models/general/state.model';
import { z } from 'zod';

export const BranchCreateSchema = z.object({
    name: z.string()
        .min(5, "El nombre de la sucursal debe contener al menos 5 caracteres"),
    address: z.string()
        .min(5, "La dirección de la sucursal debe ser de al menos 5 dígitos de largo"),
    earnings: z.number()
        .positive("Las ganancias iniciales de la sucursal no pueden ser negativas")
        .optional(),
    state: z.string()
        .refine(s => StateModel.BASIC_STATES.includes(s), `Debe proveer un estado valido para la sucursal: ${StateModel.BASIC_STATES.join(' ó ')}`)
        .optional(),
    restaurant: z.string()
        .min(1, "Debe proveer el restaurante asociado, ya sea el nombre o el id")
})