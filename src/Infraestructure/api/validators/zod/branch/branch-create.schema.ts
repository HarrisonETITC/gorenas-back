import { StateModel } from '@Domain/models/general/state.model';
import { z } from 'zod';
import { relationStringField, stateField } from '../base/base.fields';

export const BranchCreateSchema = z.object({
    name: z.string()
        .min(5, "El nombre de la sucursal debe contener al menos 5 caracteres"),
    address: z.string()
        .min(5, "La dirección de la sucursal debe ser de al menos 5 dígitos de largo"),
    earnings: z.number()
        .positive("Las ganancias iniciales de la sucursal no pueden ser negativas")
        .optional(),
    state: stateField(StateModel.BASIC_STATES, true),
    restaurant: relationStringField('restaurante')
})