import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { customerSupportDTO } from './customerSupport.dto';
import { customerSupport } from './entity/customerSupport.entity';
import { busEntity } from './entity/bus.entity';
import * as bcrypt from 'bcrypt';
//import { MailerService } from '@nestjs-modules/mailer';
import { user } from './entity/user.entity';
import { userDTO } from './user.dto';

@Injectable()
export class customerSupportService {
    constructor(
        @InjectRepository(customerSupport)
        private csRepository: Repository<customerSupport>,
        //private mailerService: MailerService,
        @InjectRepository(busEntity) 
        private busRepository: Repository<busEntity>,
        @InjectRepository(user) 
        private userRepository: Repository<user>,
    ) {}
    
    getHello(): string {
        return 'Hello CustomerSupport!';
    }

    async createEMP(user: customerSupportDTO): Promise<customerSupportDTO> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        return this.csRepository.save(user);
    }

    async login(user: customerSupportDTO): Promise<boolean> {
        const csData = await this.csRepository.findOne({ where: { email: user.email } });

        if (!csData) {
            return false;
        }

        const isMatch = await bcrypt.compare(user.password, csData.password);
        return isMatch;
    }
    
    async editProfile(email: string, updatedProfile: customerSupportDTO): Promise<customerSupportDTO> {
        const userToUpdate = await this.csRepository.findOne({ where: { email } });

        if (!userToUpdate) {
            throw new NotFoundException("User not found");
        }

        const mergedUser = this.csRepository.merge(userToUpdate, updatedProfile);

        return this.csRepository.save(mergedUser);
    }

    async changePassword(email: string, oldPassword: string, newPassword: string): Promise<string> {
        const userToUpdate = await this.csRepository.findOne({ where: { email } });

        if (!userToUpdate) {
            throw new NotFoundException("User not found");
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, userToUpdate.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid old password");
        }

        const salt = await bcrypt.genSalt();
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        userToUpdate.password = hashedNewPassword;

        await this.csRepository.save(userToUpdate);
        return "Password changed successfully";
    }

    async uploadProfilePicture(id: number, file: Express.Multer.File): Promise<string> {
        const userToUpdate = await this.userRepository.findOne({where:{id}});
        if (!userToUpdate) {
            throw new NotFoundException('User with ID ${id} not found');
        }
        
        const previousProfilePicture = userToUpdate.profilePicture;
        userToUpdate.profilePicture = file.filename;
        await this.userRepository.save(userToUpdate);
        if (previousProfilePicture) {
            // Handle deleting the previous profile picture file if needed
        }
        return file.filename;
    }

    /*async sendEmail(csData): Promise<void> {
        await this.mailerService.sendMail({
            to: csData.email,
            subject: csData.subject,
            text: csData.text, 
        });
    }*/

    async createUser(users: userDTO): Promise<user> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(users.password, salt);
        const user: user = {
            password: hashedPassword,
            id: 0,
            name: '',
            email: '',
            phone: 0,
            gender: '',
            dateOfBirth: undefined,
            profilePicture: undefined,
            customerSupport: []
        };
        return this.userRepository.save(user);
    }

    async getAllUsers(): Promise<user[]> {
        return this.userRepository.find();
    }

    async getUserById(id: number): Promise<user> {
        return this.userRepository.findOne({ where: { id } });
    }

    async findUserByPhone(phone: number): Promise<user> {
        return this.userRepository.findOne({ where: { phone } });
    }

    async updateUser(id: number, updatedUserDto: userDTO): Promise<user> {
        const userToUpdate = await this.userRepository.findOne({ where: { id } });
    
        if (!userToUpdate) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(updatedUserDto.password, salt);
        updatedUserDto.password = hashedPassword;
    
        const mergedUser = this.userRepository.merge(userToUpdate, updatedUserDto);
    
        return this.userRepository.save(mergedUser);
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    async createBus(bus: busEntity): Promise<busEntity> {
        return this.busRepository.save(bus);
    }

    async getAllBuses(): Promise<busEntity[]> {
        return this.busRepository.find();
    }

    async getBusById(id: number): Promise<busEntity> {
        return this.busRepository.findOne({where:{id}});
    }

    async updateBus(id: number, updatedBus: busEntity): Promise<busEntity> {
        await this.busRepository.update(id, updatedBus);
        return this.busRepository.findOne({where:{id}});
    }

    async deleteBus(id: number): Promise<void> {
        await this.busRepository.delete(id);
    }
}
