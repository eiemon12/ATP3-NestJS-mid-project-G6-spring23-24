import { Injectable,UnauthorizedException } from '@nestjs/common';
import { CustomerDTO } from './customer.dto';
import { reviewDTO } from './reviewDTO.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { customerentity } from './customerentity.entity';
import{vehicelentity} from './vehicelentity.entity';
import { ReviewEntity } from './review.entity';
import {Like, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { promises } from 'dns';
import { CustomerSupportEntity } from 'src/customerSupport/customerSupport.entity';

@Injectable()
export class CustomerService {
  constructor (

    @InjectRepository(customerentity) private customerRepository: Repository<customerentity>,
    @InjectRepository(vehicelentity) private vehicelRepository: Repository<vehicelentity>,
    @InjectRepository(ReviewEntity) private reviewRepository: Repository<ReviewEntity>

  ){}


  


  async customersignup(customerinfo){
    const usedusername = await this.getcustomerbyusername(customerinfo.username);
    
    const usedemail = await this.getcustomerbyemail(customerinfo.email);

    if(usedusername || usedemail){
      return {"massage":"user name or email used"};
    }else{
      const salt =await bcrypt.genSalt();
      const hassedpassed = await bcrypt.hash(customerinfo.password, salt);
      customerinfo.password=hassedpassed;
      return await this.customerRepository.save(customerinfo);

    }

  }

  async getcustomerbyusername(username: string): Promise<customerentity | undefined>{
    return await this.customerRepository.findOne({where:{username}});
  }

  async getcustomerbyemail(email: string): Promise<customerentity | undefined>{
    return await this.customerRepository.findOne({where:{email}});
  }


  async createpro(Cprofile:customerentity):Promise<customerentity>{
    const newprofile = this.customerRepository.create(Cprofile);
    return this.customerRepository.save(newprofile);
  }

  async vehicellist(vehicellist:vehicelentity):Promise<vehicelentity>{
    const newvehicellist= this.vehicelRepository.create(vehicellist);
    return this.vehicelRepository.save(newvehicellist);
  }


  async searhvehicel(vehicelname: string): Promise<vehicelentity> {
    return this.vehicelRepository.findOneBy({vehicelname:vehicelname});
    }

  async getsearhvehicel(vehicelNumber: string): Promise<vehicelentity> {
    return this.vehicelRepository.findOneBy({vehicelNumber:vehicelNumber});
    }


  async updateprofile(username: string, updateprofile: Partial<CustomerDTO>): Promise<CustomerDTO> {
    await this.customerRepository.update({ username }, updateprofile);
    return this.customerRepository.findOne({ where: { username } });
  }

  async deleteProfile(username: string): Promise<void> {
      await this.customerRepository.delete({ username });
  }
  


 /* async deleteProfile(username:string): Promise<void> {
    await this.customerRepository.delete(username);
    }*/


    async giveReview(review: ReviewEntity): Promise<ReviewEntity> {
      return await this.reviewRepository.save(review);
    }
   
    /*async insertUser(mydto) {
      const salt = await bcrypt.genSalt();
      const hassedpassed = await bcrypt.hash(mydto.password, salt);
      mydto.password= hassedpassed;
       return this.customerRepository.save(mydto);
      }*/



}