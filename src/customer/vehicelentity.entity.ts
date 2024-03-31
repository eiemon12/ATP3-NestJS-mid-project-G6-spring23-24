import { Entity, PrimaryGeneratedColumn, Column,ManyToOne } from 'typeorm';
import { Matches } from "class-validator";
import { IsEmail, IsString,IsNotEmpty,Length,IsEnum} from "class-validator";
import { customerentity } from './customerentity.entity';


@Entity("vehicellist")

export class vehicelentity {

  
  @IsNotEmpty({message: 'Please enter a valid id'})
  @Length(4,100)
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @IsNotEmpty({message: 'Please enter a valid name'})
  @IsString({message: 'Please enter a string name'})
  @Length(3,10)
  @Column({ type: 'varchar', length: 100 })
  vehiceltype: string;

  @IsNotEmpty({message: 'Please enter a valid name'})
  @IsString({message: 'Please enter a string name'})
  @Length(4,10)
  @Column({ type: 'varchar', length: 100 })
  vehicelname: string;

  @IsNotEmpty({message: 'Please enter a valid seat numbers'})
  @Length(2,3)
  @Column({ type: 'int', unsigned: true })
  seat: number;


  @IsString({ message: 'vehicel number should be a string' })
  @Column()
  vehicelNumber: string;

  @ManyToOne(()=>customerentity, customerentity=>customerentity.vehicels)
  customerentity:customerentity;

}
