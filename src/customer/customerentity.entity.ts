import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

enum Gender {
  Male = 'male',
  Female = 'female',
}

@Entity("customer")

export class customerentity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  fullName: string;

  @Column({ type: 'varchar', length: 100 })
  username: string;

  @Column({ type: 'int', unsigned: true })
  age: number;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  gender: Gender;

  @Column()
  phoneNumber: string;

  @Column({ type: 'varchar', enum: ['active', 'inactive'], default: 'active' })
  status: string;

}
