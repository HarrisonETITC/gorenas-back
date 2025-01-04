import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { GeneralModel } from "@Domain/models/general/general.model";
import { DtoMapperPort } from "@Domain/ports/dto-mapper.port";
import { GeneralRepositoryPort } from "@Domain/ports/general-repository.port";
import { GeneralServicePort } from "@Domain/ports/general-service.port";
import { BadRequestException } from "@nestjs/common";
import { AppUtil } from "@Application/core/utils/app.util";
import { GetAvailableCanSeePort } from "@Application/ports/available-cansee.port";
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { IdValue } from "@Domain/interfaces/id-value.interface";

export class GeneralServiceAdapter<T extends GeneralModel, U = T, K = T, J = T> implements GeneralServicePort<T, U, K, J>, 
    GenerateModelViewPort<T, J>, GetAvailableCanSeePort<J> {

    constructor(
        protected readonly repository: GeneralRepositoryPort<T, J> & GenerateModelViewPort<T, J> & GetAvailableCanSeePort<J>,
        protected readonly mapper: DtoMapperPort<T, U, K>
    ) { }

    async getAll(): Promise<T[]> {
        return await this.repository.getAll();
    }
    async getById(id: number): Promise<J> {
        const finded = await this.repository.getById(id);

        if (AppUtil.verifyEmpty(finded))
            throw new BadRequestException(`No se encontró ningún dato con el id '${id}'`);

        return finded;
    }
    async create(newObj: U): Promise<T> {
        const parsed = this.mapper.fromCreateToModel(newObj);
        return await this.repository.create(parsed);
    }
    async modify(id: number, modifyObj: K): Promise<T> {
        const parsed = this.mapper.fromUpdateToModel(modifyObj);
        return await this.repository.modify(id, parsed);
    }
    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
    async generateModelView(models: T[]): Promise<J[]> {
        return await this.repository.generateModelView(models);
    }
    async getAvailable(params: BasicSearchParams): Promise<Array<IdValue>> {
        return await this.repository.getAvailable(params);
    }
    async getCanSee(params: BasicSearchParams): Promise<J[]> {
        return await this.repository.getCanSee(params)
    }
    async getIdValueMany(ids: Array<IdValue>): Promise<Array<IdValue>> {
        return await this.repository.getIdValueMany(ids);
    }
}