
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm';

@Entity('users')
export class customerSupportEntity {
    validatePassword(password: string) {
        throw new Error('Method not implemented.');
    } 
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
    
    @Column()
    userType: string;
}

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
    
}


