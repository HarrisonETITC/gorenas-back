import { GeneralEntity } from "@Infraestructure/orm/typeorm/entities/general/general.entity";
import { DataSource, EntityTarget, Repository } from "typeorm";

export class GeneralService<T extends GeneralEntity> {
    protected repositorio: Repository<T>;

    constructor(source: DataSource, target: EntityTarget<T>) {
        this.repositorio = source.getRepository(target);
    }

    async todos(): Promise<Array<T>> {
        return await this.repositorio.find();
    }

    async buscarPorId(id: number): Promise<T> {
        const opts = {};
        opts["id"] = id;

        return await this.repositorio.findOneBy(opts);
    }

    async crear(nuevo: T): Promise<T> {
        const creado = this.repositorio.create(nuevo);

        return await this.repositorio.save(creado);
    }

    async modificar(id: number, cambiar: T): Promise<T> {
        cambiar.id = id;

        return await this.repositorio.save(cambiar);
    }

    async eliminar(id: number): Promise<string> {
        await this.repositorio.delete(id);

        return `Registro eliminado correctamente`;
    }
}