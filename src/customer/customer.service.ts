import { Injectable } from '@nestjs/common';
import { CustomerDTO } from './customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { customerentity } from './customerentity.entity';
import { Repository } from 'typeorm';
import { promises } from 'dns';

@Injectable()
export class CustomerService {
  constructor (@InjectRepository(customerentity) private customerRepository: Repository<customerentity>){}

  

  getlogin(id: string): object {
    return {massage:"log in succesful"};
  }

  getlog(id: string): object {
    return {massage1:"id is :" +id ,  massage:"log in succesful"};
  }

  async creatpro(Cprofile:customerentity):Promise<customerentity>{
    const newprofile = this.customerRepository.create(Cprofile);
    return this.customerRepository.save(newprofile);
  }

  async modifypro(id: number, status: string): Promise<CustomerDTO>{
    await this.customerRepository.update(id,{status:status});
    return this.customerRepository.findOneBy({id:id});
  }

  deletepro(id: string, myobj:object):object{
    return {massage:"delete successfuly"};
  }



}