import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {customerentity} from './customerentity.entity';
import { ReviewEntity } from './review.entity';
import{vehicelentity} from './vehicelentity.entity';
import { Bookingentity } from './booking.entity';
//import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [TypeOrmModule.forFeature([customerentity,vehicelentity,ReviewEntity,Bookingentity])
 /* MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
               port: 465,
               ignoreTLS: true,
               secure: true,
               auth: {
                   user: 'whatadrag79@gmail.com',
                   pass: 'ifzm uqvs qnjh brgp'
               },
              }
  }),*/
],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
