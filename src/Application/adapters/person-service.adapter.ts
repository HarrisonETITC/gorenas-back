import { Inject, Injectable } from "@nestjs/common";
import { GeneralServiceAdapter } from "./general-service.adapter";
import { PersonModel } from "@Domain/models/person.model";
import { PersonCreateDto } from "@Domain/models/create-dto/person-create.dto";
import { PersonUpdateDto } from "@Domain/models/update-dto/person-update.dto";
import { PersonModelView } from "@Application/model-view/person.mv";
import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { GeneralRepositoryPort } from "@Domain/ports/general-repository.port";
import { DtoMapperPort } from "@Domain/ports/dto-mapper.port";
import { PERSON_DTO_MAPPER, PERSON_REPOSITORY } from "@Application/config/inject-tokens/person.tokens";
import { GetAvailableCanSeePort } from "@Application/ports/available-cansee.port";
import { IdValue } from "@Domain/interfaces/id-value.interface";
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";

@Injectable()
export class PersonServiceAdapter extends GeneralServiceAdapter<PersonModel, PersonCreateDto, PersonUpdateDto, PersonModelView> implements GetAvailableCanSeePort<PersonModelView> {
    constructor(
        @Inject(PERSON_REPOSITORY)
        private readonly personRepository: GeneralRepositoryPort<PersonModel> & GenerateModelViewPort<PersonModel, PersonModelView> & GetAvailableCanSeePort<PersonModelView>,
        @Inject(PERSON_DTO_MAPPER)
        private readonly personMapper: DtoMapperPort<PersonModel, PersonCreateDto, PersonUpdateDto>
    ) {
        super(personRepository, personMapper);
    }

    async getAvailable(params: BasicSearchParams): Promise<Array<IdValue>> {
        return await this.personRepository.getAvailable(params);
    }
    async getCanSee(params: BasicSearchParams): Promise<PersonModelView[]> {
        return await this.personRepository.getCanSee(params);
    }
}
