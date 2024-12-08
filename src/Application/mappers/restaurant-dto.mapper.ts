import { RestaurantBuilder } from "@Domain/models/builders/restaurant-model.builder";
import { RestaurantCreateDto } from "@Domain/models/create-dto/restaurant-create.dto";
import { RestaurantModel } from "@Domain/models/restaurant.model";
import { RestaurantUpdateDto } from "@Domain/models/update-dto/restaurant-update.dto";
import { DtoMapperPort } from "@Domain/ports/dto-mapper.port";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RestaurantDtoMapper implements DtoMapperPort<RestaurantModel, RestaurantCreateDto, RestaurantUpdateDto> {
    fromModelToCreate(base: RestaurantModel, params?: Map<string, string>): RestaurantCreateDto {
        return {
            address: base.address ?? null,
            name: base.name ?? null
        };
    }
    fromModelToUpdate(base: RestaurantModel, params?: Map<string, string>): RestaurantUpdateDto {
        return {
            id: base.id,
            address: base.address,
            name: base.name
        }
    }
    fromCreateToModel(create: RestaurantCreateDto, params?: Map<string, string>): RestaurantModel {
        return new RestaurantBuilder()
            .setId(null)
            .setName(create.name ?? null)
            .setAddress(create.address ?? null)
            .build();
    }
    fromUpdateToModel(update: RestaurantUpdateDto, params?: Map<string, string>): RestaurantModel {
        return new RestaurantBuilder()
            .setId(update.id ?? null)
            .setName(update.name ?? null)
            .setAddress(update.address ?? null)
            .build();
    }
}
