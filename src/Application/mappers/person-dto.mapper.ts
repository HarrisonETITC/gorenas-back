import { PersonBuilder } from "@Domain/models/builders/person.builder";
import { PersonCreateDto } from "@Domain/models/create-dto/person-create.dto";
import { PersonModel } from "@Domain/models/person.model";
import { PersonUpdateDto } from "@Domain/models/update-dto/person-update.dto";
import { DtoMapperPort } from "@Domain/ports/dto-mapper.port";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PersonDtoMapper implements DtoMapperPort<PersonModel, PersonCreateDto, PersonUpdateDto> {
    fromModelToCreate(base: PersonModel, params?: Map<string, string>): PersonCreateDto {
        const create: PersonCreateDto = {
            names: base.names ?? null,
            surnames: base.surnames ?? null,
            identification: base.identification ?? null,
            typeIdentification: base.typeIdentification ?? null,
            phoneNumber: base.phoneNumber ?? null,
            rh: base.rh ?? null,
            address: base.address ?? null,
            born: base.born ?? null,
            rol: params?.get('rol') ?? null,
            person: params?.get('person') ?? null,
        };
        return create;
    }
    fromModelToUpdate(base: PersonModel, params?: Map<string, string>): PersonUpdateDto {
        const update: PersonUpdateDto = {
            id: base.id ?? null,
            names: base.names ?? null,
            surnames: base.surnames ?? null,
            identification: base.identification ?? null,
            typeIdentification: base.typeIdentification ?? null,
            phoneNumber: base.phoneNumber ?? null,
            rh: base.rh ?? null,
            address: base.address ?? null,
            born: base.born ?? null,
            rol: params?.get('rol') ?? null,
            person: params?.get('person') ?? null,
        };
        return update;
    }
    fromCreateToModel(create: PersonCreateDto, params?: Map<string, string>): PersonModel {
        return new PersonBuilder()
            .setId(null)
            .setNames(create.names ?? null)
            .setSurnames(create.surnames ?? null)
            .setIdentification(create.identification ?? null)
            .setTypeIdentification(create.typeIdentification ?? null)
            .setPhoneNumber(create.phoneNumber ?? null)
            .setRh(create.rh ?? null)
            .setAddress(create.address ?? null)
            .setBorn(create.born ?? null)
            .setCreated(null)
            .build();
    }
    fromUpdateToModel(update: PersonUpdateDto, params?: Map<string, string>): PersonModel {
        return new PersonBuilder()
            .setId(update.id ?? null)
            .setNames(update.names ?? null)
            .setSurnames(update.surnames ?? null)
            .setIdentification(update.identification ?? null)
            .setTypeIdentification(update.typeIdentification ?? null)
            .setPhoneNumber(update.phoneNumber ?? null)
            .setRh(update.rh ?? null)
            .setAddress(update.address ?? null)
            .setBorn(update.born ?? null)
            .setCreated(null)
            .build();
    }
}