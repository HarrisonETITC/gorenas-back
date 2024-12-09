import { Controller, Inject } from "@nestjs/common";
import { GeneralControllerAdapter } from "./general-controller.adapter";
import { PersonModel } from "@Domain/models/person.model";
import { PersonCreateDto } from "@Domain/models/create-dto/person-create.dto";
import { PersonUpdateDto } from "@Domain/models/update-dto/person-update.dto";
import { PersonModelView } from "@Application/model-view/person.mv";
import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { PERSON_SERVICE } from "@Application/config/inject-tokens/person.tokens";
import { GeneralServicePort } from "@Domain/ports/general-service.port";
import { ROUTE_PERSON } from "@Application/api/api.routes";

@Controller(ROUTE_PERSON)
export class PersonController extends GeneralControllerAdapter<PersonModel, PersonCreateDto, PersonUpdateDto, PersonModelView> {
    constructor(
        @Inject(PERSON_SERVICE) private readonly personService: GeneralServicePort<PersonModel, PersonCreateDto, PersonUpdateDto> & GenerateModelViewPort<PersonModel, PersonModelView>
    ) {
        super(personService)
    }
}