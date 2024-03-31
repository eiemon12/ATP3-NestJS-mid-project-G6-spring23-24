import { Entity, PrimaryGeneratedColumn, Column ,OneToOne,OneToMany, JoinColumn} from 'typeorm';
import { Matches } from "class-validator";
import { IsEmail, IsString,IsNotEmpty,Length,IsEnum} from "class-validator";
import { ReviewEntity } from './review.entity';
import { vehicelentity } from './vehicelentity.entity';

enum Gender {
  Male = 'male',
  Female = 'female',
}

@Entity("customer")

export class customerentity {


  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column()
  fullName: string;

 
  @Column()
  username: string;

  @Column({ type: 'int', unsigned: true })
  age: number;



  @Column()
  password: string;


  @Column({unique: true})
  email: string;


  @Column()
  gender: Gender;


  
  @Column()
  phoneNumber: string;


  @Column({ type: 'varchar', enum: ['active', 'inactive'], default: 'active' })
  status: string;

 // @Column()
  //filename: string;

  @OneToOne(() =>ReviewEntity, ReviewEntity=>ReviewEntity.customerentity,{cascade:true})
  @JoinColumn()
  review: ReviewEntity;


  //@OneToMany(() => ReviewEntity, review => review.customerentity, { cascade: true })
  //reviews: ReviewEntity[];

  @OneToMany(()=>vehicelentity, (vehicelentity)=>vehicelentity.customerentity,{cascade:true})
  vehicels:vehicelentity[];

}
