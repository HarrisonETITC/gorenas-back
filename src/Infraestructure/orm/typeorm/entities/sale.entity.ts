import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { GeneralEntity } from "@typeorm/entities/general/general.entity";
import { EmployeeEntity } from "./employee.entity";

@Entity({ name: 'sale' })
export class SaleEntity extends GeneralEntity {
    public static readonly METHOD_CREDIT = 'credito';
    public static readonly METHOD_DEBIT = 'debito';
    public static readonly METHOD_TRANSFERENCY = 'transferencia';
    public static readonly METHOD_CASH = 'efectivo';
    public static readonly METHOD_PLATAFORMS = 'plataformas';

    @Column({ type: 'decimal', precision: 16, scale: 2, nullable: true })
    ammount: number;

    @Column({ name: 'paymenth_method', length: 30, nullable: true, default: SaleEntity.METHOD_CASH })
    paymentMethod: string;

    @CreateDateColumn({})
    created: Date;

    @UpdateDateColumn({})
    modified: Date;

    @Column({ name: 'employee_id', nullable: true })
    employeeId: number;

    @ManyToOne(() => EmployeeEntity, employee => employee.sales)
    @JoinColumn(({ name: 'employee_id' }))
    employee?: EmployeeEntity;

}