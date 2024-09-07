import { Injectable,NotFoundException,UnauthorizedException } from '@nestjs/common';
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
import { Bookingentity } from './booking.entity';
import { CreateBookingDto } from './bookingDTO.dto';

@Injectable()
export class CustomerService {
  constructor (

    @InjectRepository(customerentity) private customerRepository: Repository<customerentity>,
    @InjectRepository(vehicelentity) private vehicelRepository: Repository<vehicelentity>,
    @InjectRepository(ReviewEntity) private reviewRepository: Repository<ReviewEntity>,
    @InjectRepository(Bookingentity)private bookingRepository: Repository<Bookingentity>,
  ) {}




  async createBooking(createBookingDto: CreateBookingDto): Promise<Bookingentity> {
    const booking = this.bookingRepository.create(createBookingDto);
    return this.bookingRepository.save(booking);
  }




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

  async getCustomerByEmail(email: string): Promise<CustomerDTO | undefined> {
    return await this.customerRepository.findOne({ where: { email } });
}


  //async getProfile(email: string): Promise<CustomerDTO | undefined>{
  //const {id,fullName,username,password,gender,phoneNumber,status, ...response} = await this.findIfExists(email);
   //return response;
 // }


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


  async updateprofile(email: string, updateprofile: Partial<customerentity>): Promise<customerentity> {
    await this.customerRepository.update({ email }, updateprofile);
    return this.customerRepository.findOne({ where: { email} });
  }

  async deleteProfile(username: string): Promise<void> {
      await this.customerRepository.delete({ username });
  }
  


 /* async deleteProfile(username:string): Promise<void> {
    await this.customerRepository.delete(username);
    }*/




    async updateProfile(email: string, updateProfile: Partial<customerentity>): Promise<customerentity> {
      await this.customerRepository.update({ email }, updateProfile);
      const updatedCustomer = await this.customerRepository.findOne({ where: { email } });
  
      if (!updatedCustomer) {
        throw new NotFoundException('Customer not found');
      }
  
      return updatedCustomer;
    }



    

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