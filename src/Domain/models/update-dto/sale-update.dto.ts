export class SaleUpdateDto {
    id: number;
    amount?: number;
    paymenthMethod?: string;
    created?: Date;
    modified?: Date;
    employeeId?: string;
}