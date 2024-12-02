import { PrimaryGeneratedColumn } from "typeorm";

export abstract class GeneralEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
}