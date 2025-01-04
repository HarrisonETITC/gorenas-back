import { Inject, Injectable } from "@nestjs/common";
import { GeneralServiceAdapter } from "./general-service.adapter";
import { SaleModel } from "@Domain/models/sale.model";
import { SaleCreateDto } from "@Domain/models/create-dto/sale-create.dto";
import { SaleUpdateDto } from "@Domain/models/update-dto/sale-update.dto";
import { SaleModelView } from "@Application/model-view/sale.mv";
import { SALE_DTO_MAPPER, SALE_REPOSITORY } from "@Application/config/inject-tokens/sale.tokens";
import { GeneralRepositoryPort } from "@Domain/ports/general-repository.port";
import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { DtoMapperPort } from "@Domain/ports/dto-mapper.port";
import { GetAvailableCanSeePort } from "@Application/ports/available-cansee.port";

@Injectable()
export class SaleServiceAdapter extends GeneralServiceAdapter<SaleModel, SaleCreateDto, SaleUpdateDto, SaleModelView> {
    constructor(
        @Inject(SALE_REPOSITORY)
        private readonly saleRepository: GeneralRepositoryPort<SaleModel, SaleModelView>
            & GenerateModelViewPort<SaleModel, SaleModelView> & GetAvailableCanSeePort<SaleModelView>,
        @Inject(SALE_DTO_MAPPER)
        private readonly saleMapper: DtoMapperPort<SaleModel, SaleCreateDto, SaleUpdateDto>
    ) {
        super(saleRepository, saleMapper);
    }
}
