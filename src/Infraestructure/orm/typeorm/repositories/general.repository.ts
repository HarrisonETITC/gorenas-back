import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { GeneralModel } from "@Domain/models/general/general.model";
import { GeneralRepositoryPort } from "@Domain/ports/general-repository.port";
import { GeneralEntity } from "@Infraestructure/orm/typeorm/entities/general/general.entity";
import { AppUtil } from "@Application/core/utils/app.util";
import { DataSource, EntityTarget, Repository } from "typeorm";

export class GeneralRepository<T extends GeneralModel, U extends GeneralEntity = T, J = T> implements GeneralRepositoryPort<T>, GenerateModelViewPort<T, J> {
    protected manager: Repository<U>;

    constructor(
        protected source: DataSource,
        entity: EntityTarget<U>,
        protected mapper: EntityMapperPort<T, U, J>
    ) {
        this.manager = source.getRepository(entity);
    }
    async getAll(attrs?: Array<string>): Promise<T[]> {
        const allData = await this.manager.find();
        return !AppUtil.verifyEmpty(allData) ?
            allData.map((data) => this.mapper.fromEntityToDomain(data)) : [];
    }
    async getById(id: number, attrs?: Array<string>): Promise<T> {
        const finded = await this.manager.findOneBy({ id: (id as any) });

        if (AppUtil.verifyEmpty(finded))
            return null;

        return this.mapper.fromEntityToDomain(finded);
    }
    async create(obj: T): Promise<T> {
        const created = this.manager.create(this.mapper.fromDomainToEntity(obj));
        return this.mapper.fromEntityToDomain(await this.manager.save(created));
    }
    async modify(id: number, obj: T): Promise<T> {
        return this.mapper.fromEntityToDomain(await this.manager.save(this.mapper.fromDomainToEntity(obj)));
    }
    async delete(id: number): Promise<void> {
        await this.manager.delete({ id: (id as any) });
    }
    async generateModelView(models: T[]): Promise<J[]> {
        return models.map((m) => this.mapper.fromDomainToMv(m));
    }
}