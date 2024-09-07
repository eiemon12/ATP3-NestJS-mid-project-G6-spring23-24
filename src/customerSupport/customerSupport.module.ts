
import { Module } from '@nestjs/common';
import { customerSupportController } from './customerSupport.controller'; 
import { customerSupportService } from './customerSupport.service'; 
import { TypeOrmModule } from '@nestjs/typeorm';
//import { MailerModule } from '@nestjs-modules/mailer';
import { MulterModule } from '@nestjs/platform-express';
import { user } from './entity/user.entity';
import { customerSupport } from './entity/customerSupport.entity';
import { busEntity } from './entity/bus.entity';

@Module({
  imports: [ /*MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
               port: 465,
               ignoreTLS: true,
               secure: true,
               auth: {
                   user: 'eftakhar885115@gmail.com',
                   pass: ''
               },
              }
  }),MulterModule.register({
    dest: './uploads',
  }),*/TypeOrmModule.forFeature([customerSupport,busEntity,user])],
  controllers: [customerSupportController],
  providers: [customerSupportService],
})
export class CustomerSupportModule {} 

