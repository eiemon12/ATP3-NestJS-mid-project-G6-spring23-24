import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('booking')
export class Bookingentity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  timing: string;

  @Column()
  availableSeat: string;

  @Column()
  name: string;

  @Column()
  bookingDate: string;

  @Column()
  seatType: string;
}
