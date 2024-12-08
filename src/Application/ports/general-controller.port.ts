import { GeneralModel } from "@Domain/models/general/general.model";
import { MessageResponse } from "@Domain/types/message-response.type";

export interface GeneralControllerPort<T extends GeneralModel, U = T, K = T, J = T> {
    findAll(): Promise<Array<J>>;
    findById(id: string): Promise<J>;
    create(data: U): Promise<J>;
    modify(data: K): Promise<J>;
    delete(id: string): Promise<MessageResponse>;
}