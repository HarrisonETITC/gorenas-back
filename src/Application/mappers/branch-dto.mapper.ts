import { BranchModel } from "@Domain/models/branch.model";
import { BranchBuilder } from "@Domain/models/builders/branch.builder";
import { BranchCreateDto } from "@Domain/models/create-dto/branch-create.dto";
import { BranchUpdateDto } from "@Domain/models/update-dto/branch-update.dto";
import { DtoMapperPort } from "@Domain/ports/dto-mapper.port";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BranchDtoMapper implements DtoMapperPort<BranchModel, BranchCreateDto, BranchUpdateDto> {
    fromModelToCreate(base: BranchModel, params?: Map<string, string>): BranchCreateDto {
        return {
            name: base.name ?? null,
            address: base.address ?? null,
            state: base.state ?? null,
            earnings: base.earnings ?? null,
            restaurant: params?.get('restaurant') ?? null
        };
    }
    fromModelToUpdate(base: BranchModel, params?: Map<string, string>): BranchUpdateDto {
        return {
            id: base.id ?? null,
            name: base.name ?? null,
            address: base.address ?? null,
            state: base.state ?? null,
            earnings: base.earnings ?? null,
            restaurant: params?.get('restaurant') ?? null
        }
    }
    fromCreateToModel(create: BranchCreateDto, params?: Map<string, string>): BranchModel {
        return new BranchBuilder()
            .setId(null)
            .setName(create.name ?? null)
            .setAddress(create.address ?? null)
            .setState(create.state ?? null)
            .setEarnings(create.earnings ?? null)
            .build();
    }
    fromUpdateToModel(update: BranchUpdateDto, params?: Map<string, string>): BranchModel {
        return new BranchBuilder()
            .setId(update.id)
            .setName(update.name ?? null)
            .setAddress(update.address ?? null)
            .setState(update.state ?? null)
            .setEarnings(update.earnings ?? null)
            .build();
    }
}
