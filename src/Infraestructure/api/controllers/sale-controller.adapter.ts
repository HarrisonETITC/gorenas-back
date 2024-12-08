import { Controller, Inject } from "@nestjs/common";
import { GeneralControllerAdapter } from "./general-controller.adapter";
import { SaleModel } from "@Domain/models/sale.model";
import { SaleCreateDto } from "@Domain/models/create-dto/sale-create.dto";
import { SaleUpdateDto } from "@Domain/models/update-dto/sale-update.dto";
import { SaleModelView } from "@Application/model-view/sale.mv";
import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { GeneralServicePort } from "@Domain/ports/general-service.port";
import { SALE_SERVICE } from "@Application/config/inject-tokens/sale.tokens";

@Controller('sale')
export class SaleController extends GeneralControllerAdapter<SaleModel, SaleCreateDto, SaleUpdateDto, SaleModelView> {
    constructor(
        @Inject(SALE_SERVICE) private readonly saleService: GeneralServicePort<SaleModel, SaleCreateDto, SaleUpdateDto> & GenerateModelViewPort<SaleModel, SaleModelView>
    ) {
        super(saleService)
    }
}
