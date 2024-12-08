import { SaleBuilder } from "@Domain/models/builders/sale.builder";
import { SaleCreateDto } from "@Domain/models/create-dto/sale-create.dto";
import { SaleModel } from "@Domain/models/sale.model";
import { SaleUpdateDto } from "@Domain/models/update-dto/sale-update.dto";
import { DtoMapperPort } from "@Domain/ports/dto-mapper.port";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SaleDtoMapper implements DtoMapperPort<SaleModel, SaleCreateDto, SaleUpdateDto> {
    fromModelToCreate(base: SaleModel, params?: Map<string, string>): SaleCreateDto {
        return {
            amount: base.amount ?? null,
            created: base.created ?? null,
            employee: params?.get('employee') ?? null,
            modified: base.modified ?? null,
            paymenthMethod: base.paymentMethod ?? null
        };
    }
    fromModelToUpdate(base: SaleModel, params?: Map<string, string>): SaleUpdateDto {
        return {
            id: base.id ?? null,
            amount: base.amount ?? null,
            created: base.created ?? null,
            employee: params?.get('employee') ?? null,
            modified: base.modified ?? null,
            paymenthMethod: base.paymentMethod ?? null
        }
    }
    fromCreateToModel(create: SaleCreateDto, params?: Map<string, string>): SaleModel {
        return new SaleBuilder()
            .setId(null)
            .setAmount(create.amount ?? null)
            .setCreated(create.created ?? null)
            .setModified(create.modified ?? null)
            .setPaymentMethod(create.paymenthMethod ?? null)
            .build();
    }
    fromUpdateToModel(update: SaleUpdateDto, params?: Map<string, string>): SaleModel {
        return new SaleBuilder()
            .setId(update.id ?? null)
            .setAmount(update.amount ?? null)
            .setCreated(update.created ?? null)
            .setModified(update.modified ?? null)
            .setPaymentMethod(update.paymenthMethod ?? null)
            .build();
    }
}
