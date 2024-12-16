import { DataResponse } from "@Domain/interfaces/data-response.interface";
import { GeneralModel } from "@Domain/models/general/general.model";
import { MessageResponse } from "@Domain/types/message-response.type";

export interface GeneralControllerPort<T extends GeneralModel, U = T, K = T, J = T> {
    findAll(): Promise<DataResponse<Array<J>>>;
    findById(id: string): Promise<DataResponse<J>>;
    create(data: U): Promise<DataResponse<J>>;
    modify(data: K): Promise<DataResponse<J>>;
    delete(id: string): Promise<MessageResponse>;
}