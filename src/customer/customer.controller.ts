import { Controller, Get,Post,Body,Put,Query, Param,Delete,UsePipes,ValidationPipe} from '@nestjs/common';
import { CustomerService } from './customer.service';
import{CustomerDTO} from'./customer.dto';
import { customerentity } from './customerentity.entity';


@Controller("/customer")
export class CustomerController {
      constructor(private readonly customerService: CustomerService) {}

      @Get('login/:id')
      getlogin(@Param('id')id: string): object {
        return this.customerService.getlogin(id);
      }

      @Get('login')
      getlog(@Query('id')id: string): object {
        return this.customerService.getlog(id);
      }



      @Post('createprofile')
      @UsePipes(new ValidationPipe)
      async creatpro(@Body() customerentity: customerentity): Promise<customerentity>{
        return await this.customerService.creatpro(customerentity);
      }


      
     @Put('modify/:id')
      async modifypro(@Param('id') id: number,@Body('status') status: string){
        return await this.customerService.modifypro(id,status);
     }


      @Delete('delete/:id')
      deletepro(@Query('id')id: string,@Body() myobj: object):object{
        return this.customerService.deletepro(id,myobj);
      }




  

}