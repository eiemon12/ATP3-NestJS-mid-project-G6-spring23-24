import { Body, Controller, Delete, Get, Param, Post, Put, Query,  UnauthorizedException } from "@nestjs/common";
import { customerSupportService } from "./customerSupport.service";
import { customerSupportEntity } from "./customerSupport.entity";
import { busEntity } from "./customerSupport.entity";

@Controller('/customerSupport')
export class customerSupportController {

    constructor(private readonly customerSupportService: customerSupportService) {}

    @Get('hello')
    getHello(): string {
        return this.customerSupportService.getHello();
    }

    @Post('createEMP')
    async createEMP(@Body() user: customerSupportEntity): Promise<customerSupportEntity> {
        return await this.customerSupportService.createUser(user);
    }

    //auth
    @Post('login')
    async login(@Body('email') email: string, @Body('password') password: string): Promise<customerSupportEntity> {
        return this.customerSupportService.login(email, password);
    }

    //user

    @Post('createUser')
    async createUser(@Body() user: customerSupportEntity): Promise<customerSupportEntity> {
        user.userType = 'customer';
        return await this.customerSupportService.createUser(user);
    }
    @Get('getAllUsers')
    async getAllUsers(): Promise<customerSupportEntity[]> {
        return await this.customerSupportService.getUsersByType('customer');
    }
    @Get('getUser/:id')
    async getUserById(@Param('id') id: number): Promise<customerSupportEntity> {
        return await this.customerSupportService.getUserById(id, 'customer');
    }
    @Get('findByPhone')
    async findUserByPhone(@Query('phone') phone: number): Promise<customerSupportEntity> {
        return await this.customerSupportService.findUserByPhone(phone,'customer');
    }
    @Put('updateUser/:id')
    async updateUser(@Param('id') id: number, @Body() updateUser: Partial<customerSupportEntity>): Promise<customerSupportEntity> {
    return await this.customerSupportService.updateUser(id, updateUser);
    }
    @Delete('deleteUser/:id')
    async deleteUser(@Query('id') id: number): Promise<void> {
        await this.customerSupportService.deleteUser(id);
    }
    

    

    //bus

    @Post('createBusInfo')
    async createBus(@Body() bus: busEntity): Promise<busEntity> {
        return this.customerSupportService.createBus(bus);
    }

    @Get('getAllBuses')
    async getAllBuses(): Promise<busEntity[]> {
        return this.customerSupportService.getAllBuses();
    }

    @Get('getBusById/:id')
    async getBusById(@Param('id') id: number): Promise<busEntity> {
        return this.customerSupportService.getBusById(id);
    }

    @Put('updateBus/:id')
    async updateBus(@Param('id') id: number, @Body() updatedBus: busEntity): Promise<busEntity> {
        return this.customerSupportService.updateBus(id, updatedBus);
    }

    @Delete('deleteBus/:id')
    async deleteBus(@Param('id') id: number): Promise<void> {
        return this.customerSupportService.deleteBus(id);
    }
}