import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { PersonModel } from "@Domain/models/person.model";
import { Injectable } from "@nestjs/common";
import { PersonEntity } from "../entities/person.entity";
import { PersonModelView } from "@Application/model-view/person.mv";
import { PersonBuilder } from "@Domain/models/builders/person.builder";
import { PersonTransformParams } from "@Application/core/params/transform/person-transform.params";

@Injectable()
export class PersonEntityMapper implements EntityMapperPort<PersonModel, PersonEntity, PersonModelView, PersonTransformParams> {
    fromEntityToDomain(entity: PersonEntity): PersonModel {
        return new PersonBuilder()
            .setId(entity.id ?? null)
            .setNames(entity.names ?? null)
            .setSurnames(entity.surnames ?? null)
            .setIdentification(entity.identification ?? null)
            .setTypeIdentification(entity.typeIdentification ?? null)
            .setPhoneNumber(entity.phoneNumber ?? null)
            .setRh(entity.rh ?? null)
            .setAddress(entity.address ?? null)
            .setBorn(entity.born ?? null)
            .setCreated(entity.created ?? null)
            .build();
    }
    fromDomainToEntity(domain: PersonModel): PersonEntity {
        const entity: PersonEntity = {
            id: domain.id ?? null,
            names: domain.names ?? null,
            surnames: domain.surnames ?? null,
            identification: domain.identification ?? null,
            typeIdentification: domain.typeIdentification ?? null,
            phoneNumber: domain.phoneNumber ?? null,
            rh: domain.rh ?? null,
            address: domain.address ?? null,
            born: domain.born ?? null,
            created: domain.created ?? null,
        }

        return entity;
    }
    fromDomainToMv(domain: PersonModel, extra?: PersonTransformParams): PersonModelView {
        const mv: PersonModelView = {
            id: domain.id,
            email: extra?.email ?? null,
            names: domain.names ?? null,
            surnames: domain.surnames ?? null,
            identification: domain.identification ?? null,
            branch: extra?.branch ?? null,
            role: extra?.role ?? null
        }

        return mv;
    }
}