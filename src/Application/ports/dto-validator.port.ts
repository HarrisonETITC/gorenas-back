export interface DtoValidatorPort {
    validate<T>(data: T, schema: any): Promise<void>;
}