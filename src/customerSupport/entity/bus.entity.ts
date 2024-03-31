import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { customerSupport } from "./customerSupport.entity";

@Entity('buses')
export class busEntity { 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    operatorName: string;

    @Column()
    coachNumber: number;

    @Column()
    coachType: string;

    @Column()
    totalSit: number;

    @Column()
    route: string;

    @Column()
    time: string;
    customerSupportEntity: any;

    @ManyToMany(()=> customerSupport,customerSupport=>customerSupport.bus)
    customerSupport: customerSupport[];
}