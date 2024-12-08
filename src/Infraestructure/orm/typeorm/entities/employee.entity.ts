import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { GeneralEntity } from "./general/general.entity";
import { PersonEntity } from "./person.entity";
import { SaleEntity } from "./sale.entity";
import { BranchEntity } from "./branch.entity";
import { StateModel } from "@Domain/models/general/state.model";

@Entity({ name: 'employee' })
export class EmployeeEntity extends GeneralEntity {
    @Column({ type: 'decimal', precision: 16, scale: 2, nullable: true })
    salary: number;

    @Column({ length: 1, default: StateModel.STATE_ACTIVE })
    state: string;

    @Column({ name: 'branch_id', nullable: true })
    branchId: number;

    @ManyToOne(() => BranchEntity, branch => branch.employees)
    @JoinColumn({ name: 'branch_id' })
    branch?: BranchEntity;

    @Column({ name: 'person_id', nullable: true })
    personId: number;

    @OneToOne(() => PersonEntity, person => person.employee)
    @JoinColumn({ name: 'person_id' })
    person?: PersonEntity;

    @OneToMany(() => SaleEntity, sale => sale.employee)
    sales?: Array<SaleEntity>;
}