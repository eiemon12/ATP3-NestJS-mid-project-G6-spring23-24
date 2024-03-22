// customerSupport.module.ts
import { Module } from '@nestjs/common';
import { customerSupportController } from './customerSupport.controller'; 
import { customerSupportService } from './customerSupport.service'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerSupportEntity } from './customerSupport.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerSupportEntity])],
  controllers: [customerSupportController],
  providers: [customerSupportService],
})
export class CustomerSupportModule {} 
