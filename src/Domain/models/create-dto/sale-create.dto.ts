export class SaleCreateDto {
    amount: number;
    paymentMethod: string;
    created?: Date;
    modified?: Date;
    employee: string;
}