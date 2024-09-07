import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Session, UnauthorizedException, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { customerSupportService } from "./customerSupport.service";
import { customerSupportDTO } from "./customerSupport.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { busEntity } from "./entity/bus.entity";
import { userDTO } from "./user.dto";
import { user } from "./entity/user.entity";
import { customerSupport } from "./entity/customerSupport.entity";

@Controller('/customerSupport')
export class customerSupportController {

    constructor(private readonly customerSupportService: customerSupportService) {}

    @Get('hello')
    getHello(): string {
        return this.customerSupportService.getHello();
    }

    @Post('createEMP')
    @UsePipes(new ValidationPipe())
    async createEMP(@Body() user: customerSupportDTO): Promise<customerSupportDTO> {
        return await this.customerSupportService.createEMP(user);
    }

    @Post('/login')
    async login(@Session() session, @Body() user: customerSupportDTO){
        const res = await (this.customerSupportService.login(user));
        if(res==true){
            session.email = user.email;
            return (session.email);
        }
        else{
            throw new UnauthorizedException({ message: "invalid credentials" });
        }
    }

    @Patch('editMyProfile')
    @UsePipes(new ValidationPipe())
    async editMyProfile(@Session() session, @Body() updatedProfile: customerSupportDTO) {
        return this.customerSupportService.editProfile(session.email, updatedProfile);
    }

    @Patch('changePassword')
    @UsePipes(new ValidationPipe())
    async changePassword(@Session() session, @Body() passwordData: { oldPassword: string; newPassword: string }) {
        return this.customerSupportService.changePassword(session.email, passwordData.oldPassword, passwordData.newPassword);
    }
    
    @Post('uploadProfilePicture/:id')
    @UseInterceptors(FileInterceptor('profilePicture'))
    async uploadProfilePicture(@Param('id') id: number, @UploadedFile() file: Express.Multer.File): Promise<string> {
        return this.customerSupportService.uploadProfilePicture(id, file);
    }

    @Get('logout')
    logout(@Session() session){
        if(session.destroy()){
            return {message:"You are logged out"};
        }
        else{
            throw new UnauthorizedException("invalid actions");
        }
    }

    /*@Post('/sendemail')
    sendEmail(@Body() mydata){
    return this.customerSupportService.sendEmail(mydata);
    }*/

    @Post('createUser')
    @UsePipes(new ValidationPipe())
    async createUser(@Body() user: userDTO): Promise<userDTO> {
        return await this.customerSupportService.createUser(user);
    }

    @Get('getAllUsers')
    @UsePipes(new ValidationPipe())
    async getAllUsers(): Promise<userDTO[]> {
        return await this.customerSupportService.getAllUsers();
    }

    @Get('getUser/:id')
    @UsePipes(new ValidationPipe())
    async getUserById(@Param('id') id: number): Promise<userDTO> {
        return await this.customerSupportService.getUserById(id);
    }

    @Get('findByPhone')
    @UsePipes(new ValidationPipe())
    async findUserByPhone(@Query('phone') phone: number): Promise<userDTO> {
        return await this.customerSupportService.findUserByPhone(phone);
    }

    @Patch('updateUser/:id')
@UsePipes(new ValidationPipe())
async updateUser(@Param('id') id: number, @Body() updatedUserDto: userDTO): Promise<userDTO> {
    const updatedUser: user = {
        // Map properties from updatedUserDto to user object
        password: updatedUserDto.password
        // Map other properties as needed
        ,


        id: 0,
        name: "",
        email: "",
        phone: 0,
        gender: "",
        dateOfBirth: undefined,
        profilePicture: undefined,
        customerSupport: []
    };
    return this.customerSupportService.updateUser(id, updatedUser);
}

    @Delete('deleteUser/:id')
    @UsePipes(new ValidationPipe())
    async deleteUser(@Param('id') id: number): Promise<void> {
        await this.customerSupportService.deleteUser(id);
    }

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
