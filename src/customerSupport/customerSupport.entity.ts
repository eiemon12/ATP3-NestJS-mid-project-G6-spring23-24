
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class CustomerSupportEntity { 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: number;

    @Column()
    password: string;
}
