import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";
import { GeneralEntity } from "@typeorm/entities/general/general.entity";
import { StateModel } from "@Domain/models/general/state.model";
import { RestaurantEntity } from "./restaurant.entity";
import { EmployeeEntity } from "./employee.entity";

@Entity({ name: 'branch' })
export class BranchEntity extends GeneralEntity {
    @Column({ length: 1, default: StateModel.STATE_ACTIVE })
    state: string;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 255, nullable: true })
    address: string;

    @Column({ type: 'decimal', precision: 16, scale: 2, nullable: true, default: 0 })
    earnings: number;

    @CreateDateColumn({})
    created: Date;

    @UpdateDateColumn({})
    modified: Date;

    @Column({ name: 'restaurant_id', nullable: true })
    restaurantId?: number;

    @ManyToOne(() => RestaurantEntity, restaurant => restaurant.branches)
    @JoinColumn({ name: 'restaurant_id' })
    restaurant?: RestaurantEntity;

    @OneToMany(() => EmployeeEntity, employee => employee.branch)
    employees?: Array<EmployeeEntity>;
}