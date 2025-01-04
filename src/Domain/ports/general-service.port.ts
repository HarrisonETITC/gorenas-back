import { GeneralModel } from "@Domain/models/general/general.model";

export interface GeneralServicePort<T extends GeneralModel, U = T, K = T, J = T> {
    getAll(): Promise<Array<T>>;
    getById(id: number): Promise<J>;
    create(newObj: U): Promise<T>;
    modify(id: number, modifyObj: K): Promise<T>;
    delete(id: number): Promise<void>;
}