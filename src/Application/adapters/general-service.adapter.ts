import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { GeneralModel } from "@Domain/models/general/general.model";
import { DtoMapperPort } from "@Domain/ports/dto-mapper.port";
import { GeneralRepositoryPort } from "@Domain/ports/general-repository.port";
import { GeneralServicePort } from "@Domain/ports/general-service.port";
import { BadRequestException } from "@nestjs/common";
import { AppUtil } from "@utils/app.util";

export class GeneralServiceAdapter<T extends GeneralModel, U = T, K = T, J = T> implements GeneralServicePort<T, U, K>, GenerateModelViewPort<T, J> {

    constructor(
        protected readonly repository: GeneralRepositoryPort<T> & GenerateModelViewPort<T, J>,
        protected readonly mapper: DtoMapperPort<T, U, K>
    ) { }
    async getAll(): Promise<T[]> {
        return await this.repository.getAll();
    }
    async getById(id: number): Promise<T> {
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
}