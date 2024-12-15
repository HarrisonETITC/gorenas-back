import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { RestaurantModel } from "@Domain/models/restaurant.model";
import { Injectable } from "@nestjs/common";
import { RestaurantEntity } from "../entities/restaurant.entity";
import { RestaurantModelView } from "@Application/model-view/restaurant.mv";
import { RestaurantBuilder } from "@Domain/models/builders/restaurant-model.builder";
import { AppUtil } from "@Application/core/utils/app.util";
import { RestaurantTranformParams } from "@Application/core/params/transform/restaurant-tranform.params";

@Injectable()
export class RestaurantEntityMapper implements EntityMapperPort<RestaurantModel, RestaurantEntity, RestaurantModelView, RestaurantTranformParams> {
    fromEntityToDomain(entity: RestaurantEntity): RestaurantModel {
        return new RestaurantBuilder()
            .setId(entity.id ?? null)
            .setName(entity.name ?? null)
            .setAddress(entity.address ?? null)
            .build();
    }
    fromDomainToEntity(domain: RestaurantModel): RestaurantEntity {
        return {
            id: domain.id ?? null,
            name: domain.name ?? null,
            address: domain.address ?? null
        };
    }
    fromDomainToMv(domain: RestaurantModel, extra?: RestaurantTranformParams): RestaurantModelView {
        return {
            id: domain.id,
            name: domain.name,
            address: domain.address,
            branches: extra?.branches ?? 0
        };
    }
}
