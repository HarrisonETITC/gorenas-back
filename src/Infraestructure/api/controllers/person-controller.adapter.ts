import { Controller, Get, Inject, Query } from "@nestjs/common";
import { GeneralControllerAdapter } from "./general-controller.adapter";
import { PersonModel } from "@Domain/models/person.model";
import { PersonCreateDto } from "@Domain/models/create-dto/person-create.dto";
import { PersonUpdateDto } from "@Domain/models/update-dto/person-update.dto";
import { PersonModelView } from "@Application/model-view/person.mv";
import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { PERSON_SERVICE } from "@Application/config/inject-tokens/person.tokens";
import { GeneralServicePort } from "@Domain/ports/general-service.port";
import { ROUTE_PERSON } from "@Application/api/api.routes";
import { GetAvailableCanSeePort } from "@Application/ports/available-cansee.port";
import { PersonsPort } from "@Application/ports/persons/persons.port";
import { SetTypedQuery } from "@Application/core/decorators/set-type-query.decorator";
import { UserIdStringDto } from "@Domain/models/general/dto/user-id-string.dto";
import { DataResponse } from "@Domain/interfaces/data-response.interface";
import { API_ID } from "@Application/api/endpoint-names";
import { AppUtil } from "@Application/core/utils/app.util";
import { GetOriginalByIdPort } from "@Application/ports/get-original-byid.port";

@Controller(ROUTE_PERSON)
export class PersonController extends GeneralControllerAdapter(PersonModel, PersonCreateDto, PersonUpdateDto, PersonModelView) {
    constructor(
        @Inject(PERSON_SERVICE)
        private readonly personService: GeneralServicePort<PersonModel, PersonCreateDto, PersonUpdateDto>
            & GenerateModelViewPort<PersonModel, PersonModelView>
            & GetAvailableCanSeePort<PersonModelView>
            & PersonsPort & GetOriginalByIdPort<PersonModel>
    ) {
        super(personService)
    }

    @Get('infoByUserId')
    @SetTypedQuery(UserIdStringDto)
    async getByUserId(@Query('userId') id: number): Promise<DataResponse<PersonModelView>> {
        return { data: (await this.personService.getByUserId(+id)) };
    }

    @Get(API_ID)
    override async findById(id: string, @Query('edition') isEdition?: string): Promise<DataResponse<PersonModelView>> {
        const finded = await this.personService.getOriginalById(Number(id));

        if (!AppUtil.verifyEmpty(isEdition) && isEdition === 'true') return { data: (finded as any) };

        const findedMV = (await this.personService.generateModelView([finded]))[0];
        return { data: findedMV };
    }
}
