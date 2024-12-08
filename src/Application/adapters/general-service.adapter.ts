import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { GeneralModel } from "@Domain/models/general/general.model";
import { DtoMapperPort } from "@Domain/ports/dto-mapper.port";
import { GeneralRepositoryPort } from "@Domain/ports/general-repository.port";
import { GeneralServicePort } from "@Domain/ports/general-service.port";

export class GeneralServiceAdapter<T extends GeneralModel, U = T, K = T, J = T> implements GeneralServicePort<T, U, K>, GenerateModelViewPort<T, J> {

    constructor(
        protected readonly repository: GeneralRepositoryPort<T> & GenerateModelViewPort<T, J>,
        protected readonly mapper: DtoMapperPort<T, U, K>
    ) { }
    async getAll(): Promise<T[]> {
        return await this.repository.getAll();
    }
    async getById(id: number): Promise<T> {
        return await this.repository.getById(id);
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
}