import { 
  Controller, Get,Post,
  Body,Put,Query, Param,
  Delete,UsePipes,ValidationPipe,
   Patch,UseGuards,Session,UploadedFile,
   UnauthorizedException,UseInterceptors,
   MaxFileSizeValidator,FileTypeValidator,ParseFilePipe,
   ParseIntPipe} from '@nestjs/common';
import { CustomerService } from './customer.service';
import{CustomerDTO} from'./customer.dto';
import{reviewDTO} from './reviewDTO.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError,diskStorage } from 'multer';
import { customerentity } from './customerentity.entity';
import { ReviewEntity } from './review.entity';
import{vehicelentity} from './vehicelentity.entity';
import { SessionGuard } from 'src/customer/session.guard';
import * as bcrypt from 'bcrypt';
import { promises } from 'dns';
import { Bookingentity } from './booking.entity';
import { CreateBookingDto } from './bookingDTO.dto';
import session from 'express-session';


@Controller("/customer")
export class CustomerController {
      constructor(private readonly customerService: CustomerService) {}



      @Post('signup')
      //@UseGuards(SessionGuard)
      @UsePipes(new ValidationPipe())
      async customersignup(@Body() signupbody: CustomerDTO):Promise<CustomerDTO> {
        return await this.customerService.customersignup(signupbody);
      }

      @Post('login')
    // @UseGuards(SessionGuard)
      async login(@Session()session, @Body() logindata:CustomerDTO): Promise<object> {
        try{ 
          const user=await this.customerService.getcustomerbyemail(logindata['email']);
        if(user){
          const isMatch=await bcrypt.compare(logindata.password, user.password);
          if(isMatch){
            session.email=user.email;
            return{massaage:'login successful',user};
          }else{
            return{massage:'worng password'}
          }
        }else{
          return{massage:'no customer found'}
        }
      }catch(error){
        throw new UnauthorizedException('Invalid login');
      }
       
     }



     @Post('booking')
    async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<Bookingentity> {
      return this.customerService.createBooking(createBookingDto);
    }



      @Post('createprofile')
     // @UseGuards(SessionGuard)
      @UsePipes(new ValidationPipe())
      async createpro(@Body() customerentity: customerentity): Promise<customerentity>{
        return await this.customerService.createpro(customerentity);
      }


      @Get('profile/:email')
      //@UseGuards(SessionGuard) // Assuming you have a guard for session authentication
      async viewProfile(@Param("email") email): Promise<CustomerDTO> {
        const userEmail = email;
        if (!userEmail) {
            throw new UnauthorizedException('User not logged in');
        }

        //console.log(123);
        return await this.customerService.getCustomerByEmail(userEmail);
    }

    


    @Patch('update/:email')
  async updateProfile(
    @Param('email') email: string,
    @Body() customerDTO: Partial<customerentity>,
  ): Promise<customerentity> {
    try {
      const updatedCustomer = await this.customerService.updateProfile(email, customerDTO);
      return updatedCustomer;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }


  


  @Delete('deleteprofile')
    //@UseGuards(SessionGuard)
    async deleteProfile(@Session() session): Promise<void> {
        const username = session.email;
        if (!username) {
          throw new UnauthorizedException('User not logged in');
        }
        else{
          await this.customerService.deleteProfile(username);
        }
      }


   
     // @UseGuards(SessionGuard) 
      @Post('vehicellist')
      @UsePipes(new ValidationPipe)
      async vehicellist(@Body() vehicelentity: vehicelentity): Promise<vehicelentity>{
        return await this.customerService.vehicellist(vehicelentity);
      }

      @Get('searchvehicel/:vehicelname')
     // @UseGuards(SessionGuard)
      searhvehicel(@Param('vehicelname')vehicelname: string): Promise<vehicelentity>{
        return this.customerService.searhvehicel(vehicelname);
      }

      @Get('searchvehicel/:vehicelNumber')
      //@UseGuards(SessionGuard)
      getsearhvehicel(@Param('vehicelNumber')vehicelNumber: string): Promise<vehicelentity>{
        return this.customerService.getsearhvehicel(vehicelNumber);
      }


      

  


       @Post('uploadfile')
        @UseInterceptors(FileInterceptor('myfile',
        {storage:diskStorage({
          destination: './uploads',
          filename: function (req, file, cb) {
            cb(null,Date.now()+file.originalname)
          }
        })
        }))
       /* insertfile(@Body() mydto:CustomerDTO,@UploadedFile(  new ParseFilePipe({
          validators: [
            new MaxFileSizeValidator({ maxSize: 160000 }),
            new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
          ],
        }),) file: Express.Multer.File){
        
        mydto.filename = file.filename;  
        console.log(mydto)
        return this.customerService.insertUser(mydto);
        }


       /* @Post('review')
       // @UseGuards(SessionGuard)
        @UsePipes(new ValidationPipe())
        async giveReview( @Body() reviewDTO: ReviewEntity): Promise<ReviewEntity> { 
           return await this.customerService.giveReview(reviewDTO);
        }*/




        @Put('/rating/:email')
      // @UsePipes(new ValidationPipe())
      async giveReviews(@Param("email") email): Promise<object> {
       // console.log(123);
        try {
          //console.log(123);
          return {};
          if (!email) {
            throw new UnauthorizedException('User not logged in');
          }else{

            const username = email;
           // reviewDTO.username = username;
           // return await this.customerService.giveReview(reviewDTO);
          }
        } catch (error) {
          throw new UnauthorizedException(error.message);
        }
      }

      @Post('/review/:email')
      @UsePipes(new ValidationPipe())
      async giveReview(@Param("email") email,@Body() reviewDTO:ReviewEntity): Promise<ReviewEntity> {

        //console.log(email);
        try {
          //console.log(123);
         // return {new ReviewEntity()};
          if (false) {

            throw new UnauthorizedException('User not logged in');
          }else{

            const username = email;
            reviewDTO.username = username;
            //console.log(123);
           // console.log(reviewDTO);
            const data=await this.customerService.giveReview(reviewDTO);
            //console.log("data:",data);
            return data;
          }
        } catch (error) {
          throw new UnauthorizedException(error.message);
        }
       
      }



      @Get('logout')
        logout(@Session() session)
        {
          if(session.destroy())
          {
            return {message:"you are logged out"};
          }
          else
          {
            throw new UnauthorizedException("invalid actions");
          }
        }




  

}