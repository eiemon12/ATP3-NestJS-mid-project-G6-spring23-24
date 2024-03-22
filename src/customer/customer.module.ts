import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {customerentity} from './customerentity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([customerentity])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
