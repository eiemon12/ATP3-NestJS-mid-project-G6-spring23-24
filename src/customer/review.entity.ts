import { Entity, Column, PrimaryGeneratedColumn, OneToOne,ManyToOne } from 'typeorm';
import { customerentity } from './customerentity.entity';

@Entity("review")
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  username: string;
  
  @Column({ type: 'integer' })
  rating: number;

  @Column({ type: 'text' })
  comment: string;

  @OneToOne(() => customerentity, customerentity => customerentity.review)
  customerentity:customerentity

 
}
