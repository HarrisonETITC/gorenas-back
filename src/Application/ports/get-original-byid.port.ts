export interface GetOriginalByIdPort<T> {
    getOriginalById(id: number): Promise<T>;
}