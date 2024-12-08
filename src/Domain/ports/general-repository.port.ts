import { GeneralModel } from "@Domain/models/general/general.model";

export interface GeneralRepositoryPort<T extends GeneralModel> {
    getAll(attrs?: Array<string>): Promise<Array<T>>;
    getById(id: number, attrs?: Array<string>): Promise<T>;
    create(obj: T): Promise<T>;
    modify(id: number, obj: T): Promise<T>;
    delete(id: number): Promise<void>;
}