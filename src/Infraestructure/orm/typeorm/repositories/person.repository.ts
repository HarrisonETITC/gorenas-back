import { Inject, Injectable } from "@nestjs/common";
import { GeneralRepository } from "./general.repository";
import { PersonModel } from "@Domain/models/person.model";
import { PersonEntity } from "../entities/person.entity";
import { PersonModelView } from "@Application/model-view/person.mv";
import { DataSource } from "typeorm";
import { PERSON_ENTITY_MAPPER } from "@Application/config/inject-tokens/person.tokens";
import { EntityMapperPort } from "@Application/ports/entity-mapper.port";

@Injectable()
export class PersonRepository extends GeneralRepository<PersonModel, PersonEntity, PersonModelView> {
    constructor(
        @Inject(DataSource) source: DataSource,
        @Inject(PERSON_ENTITY_MAPPER) personEntityMapper: EntityMapperPort<PersonModel, PersonEntity, PersonModelView>
    ) {
        super(source, PersonEntity, personEntityMapper);
    }
}
