import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { customerSupport } from "./customerSupport.entity";

@Entity('user')
export class user {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    phone: number;

    @Column()
    password: string;

    @Column()
    gender: string;

    @Column({ type: 'date' }) 
    dateOfBirth: Date;
    
    @ManyToMany(()=> customerSupport,customerSupport=>customerSupport.users)
    customerSupport: customerSupport[];
    profilePicture: any;
    static customerSupport: any;
  
}