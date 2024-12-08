import { PERSON_DTO_MAPPER, PERSON_ENTITY_MAPPER, PERSON_REPOSITORY, PERSON_SERVICE } from "@Application/config/inject-tokens/person.tokens";
import { Provider } from "@nestjs/common";
import { PersonEntityMapper } from "../../mappers/person-entity.mapper";
import { PersonDtoMapper } from "@Application/mappers/person-dto.mapper";
import { PersonRepository } from "../../repositories/person.repository";
import { PersonServiceAdapter } from "@Application/adapters/person-service.adapter";

export const PersonProviders: Array<Provider> = [
    {
        provide: PERSON_DTO_MAPPER,
        useClass: PersonDtoMapper
    },
    {
        provide: PERSON_SERVICE,
        useClass: PersonServiceAdapter
    },
    {
        provide: PERSON_ENTITY_MAPPER,
        useClass: PersonEntityMapper
    },
    {
        provide: PERSON_REPOSITORY,
        useClass: PersonRepository
    }
];
