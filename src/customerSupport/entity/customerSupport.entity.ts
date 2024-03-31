import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { user } from './user.entity';
import { busEntity } from './bus.entity';

@Entity('customerSupport')
export class customerSupport {

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

    //@Column()
    //file : string;

    @ManyToMany(()=> user,user =>user.customerSupport)
    @JoinTable()
    users: user[];

    @ManyToMany(()=> busEntity,busEntity =>user.customerSupport)
    @JoinTable()
    bus: busEntity[];
}