import { PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

export abstract class GeneralEntity {
    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn()
    id: number;
}