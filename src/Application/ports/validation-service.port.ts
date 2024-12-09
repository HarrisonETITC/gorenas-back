export interface ValidationServicePort {
    validate <T>(data: T, schema: any): Promise<void>;
}