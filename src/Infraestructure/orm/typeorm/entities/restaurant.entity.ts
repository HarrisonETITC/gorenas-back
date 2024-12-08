import { Column, Entity, OneToMany } from "typeorm";
import { GeneralEntity } from "@typeorm/entities/general/general.entity";
import { BranchEntity } from "./branch.entity";

@Entity({ name: 'restaurant' })
export class RestaurantEntity extends GeneralEntity {
    @Column({ length: 50 })
    name: string;

    @Column({ length: 255, nullable: true })
    address: string;

    @OneToMany(() => BranchEntity, branch => branch.restaurant)
    branches?: Array<BranchEntity>;
}