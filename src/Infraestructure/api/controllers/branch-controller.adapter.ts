import { Controller, Inject } from "@nestjs/common";
import { GeneralControllerAdapter } from "./general-controller.adapter";
import { BranchModel } from "@Domain/models/branch.model";
import { BranchCreateDto } from "@Domain/models/create-dto/branch-create.dto";
import { BranchUpdateDto } from "@Domain/models/update-dto/branch-update.dto";
import { BranchModelView } from "@Application/model-view/branch.mv";
import { BRANCH_SERVICE } from "@Application/config/inject-tokens/branch.tokens";
import { GeneralServicePort } from "@Domain/ports/general-service.port";
import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { ROUTE_BRANCH } from "@Application/api/api.routes";

@Controller(ROUTE_BRANCH)
export class BranchController extends GeneralControllerAdapter(BranchModel, BranchCreateDto, BranchUpdateDto, BranchModelView) {
    constructor(
        @Inject(BRANCH_SERVICE)
        private readonly branchService: GeneralServicePort<BranchModel, BranchCreateDto, BranchUpdateDto> & GenerateModelViewPort<BranchModel, BranchModelView>
    ) {
        super(branchService)
    }
}
