import { Body,Controller,Delete,Get,Param,Post, Put, Query } from "@nestjs/common";
import { customerSupportService } from "./customerSupport.service";
import { CustomerSupportEntity } from "./customerSupport.entity";

@Controller('/customerSupport')
export class customerSupportController{
    constructor(private readonly customerSupportService: customerSupportService) {}

    @Get('hello')
        getHello(): string {
        return this.customerSupportService.getHello();
    }
    @Post('registerUser')
        registerUser(@Body() myobj: object):object{
            return this.customerSupportService.registerUser(myobj);
    } 
}