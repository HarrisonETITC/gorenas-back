import { BranchModel } from "@Domain/models/branch.model";
import { GeneralServiceAdapter } from "./general-service.adapter";
import { BranchCreateDto } from "@Domain/models/create-dto/branch-create.dto";
import { BranchUpdateDto } from "@Domain/models/update-dto/branch-update.dto";
import { BranchModelView } from "@Application/model-view/branch.mv";
import { Inject, Injectable } from "@nestjs/common";
import { BRANCH_DTO_MAPPER, BRANCH_REPOSITORY } from "@Application/config/inject-tokens/branch.tokens";
import { GeneralRepositoryPort } from "@Domain/ports/general-repository.port";
import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { DtoMapperPort } from "@Domain/ports/dto-mapper.port";
import { GetAvailableCanSeePort } from "@Application/ports/cansee-available.port";
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { IdValue } from "@Domain/interfaces/id-value.interface";

@Injectable()
export class BranchServiceAdapter extends GeneralServiceAdapter<BranchModel, BranchCreateDto, BranchUpdateDto, BranchModelView> implements GetAvailableCanSeePort<BranchModelView> {
    constructor(
        @Inject(BRANCH_REPOSITORY) private readonly branchRepository: GeneralRepositoryPort<BranchModel> & GenerateModelViewPort<BranchModel, BranchModelView> & GetAvailableCanSeePort<BranchModelView>,
        @Inject(BRANCH_DTO_MAPPER) private readonly branchMapper: DtoMapperPort<BranchModel, BranchCreateDto, BranchUpdateDto>
    ) {
        super(branchRepository, branchMapper);
    }

    async getAvailable(params: BasicSearchParams): Promise<Array<IdValue>> {
        return await this.branchRepository.getAvailable(params);
    }
    async getCanSee(params: BasicSearchParams): Promise<BranchModelView[]> {
        return await this.branchRepository.getCanSee(params);
    }
}
